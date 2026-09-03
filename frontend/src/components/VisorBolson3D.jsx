import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./VisorBolson3D.css";

/*
  Visor del bolsón compartimentado.

  El GLB viene de trimesh: malla en Z-up, sin materiales ni texturas, pero con
  cada pieza nombrada (front_shell, internal_partition_x, loop_top_0, ...). Esos
  nombres son la única forma de saber qué es cada cosa, así que el material se
  asigna por prefijo de nombre en clasificar().

  El modo "corte" es el que vende el producto: baja la opacidad de las paredes
  para que se vean los tabiques internos, que es justamente lo que diferencia
  al compartimentado de un bolsón común.
*/

const MODELO_URL = "/models/bolson_compartimentado_fibc.glb";

// Paleta alineada con el resto del sitio (navy + amarillo institucional).
const COLOR_TELA = 0xf2f4f8;
const COLOR_TABIQUE = 0xffcc00;
const COLOR_ESLINGA = 0x1e6fd9;
const COLOR_COSTURA = 0x0c2c5c;

const clasificar = (nombre) => {
  // Los tabiques van en las cuatro esquinas, como en el producto real: el
  // nodo se llama internal_partition_corners.
  if (nombre.startsWith("internal_partition")) return "tabique";
  if (nombre.startsWith("top_cross")) return "tabique";
  if (nombre.startsWith("loop_")) return "eslinga";
  if (nombre.includes("seam")) return "costura";
  if (nombre.endsWith("_rim")) return "costura";
  return "tela";
};

const VisorBolson3D = ({ className = "" }) => {
  const contenedorRef = useRef(null);
  const apiRef = useRef(null);
  const [corte, setCorte] = useState(false);
  const [estado, setEstado] = useState("cargando"); // cargando | listo | error

  // Escena: se monta una sola vez. El toggle de corte se aplica aparte para no
  // recargar el modelo en cada click.
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const escena = new THREE.Scene();
    escena.background = null;

    const camara = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camara.position.set(2.35, -1.85, 1.95);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setEstado("error");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    contenedor.appendChild(renderer.domElement);

    // Luces: una key cálida al frente y relleno frío detrás para que la tela
    // blanca no quede plana.
    escena.add(new THREE.HemisphereLight(0xffffff, 0x6b7a94, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, -5, 6);
    escena.add(key);
    const relleno = new THREE.DirectionalLight(0xbcd2ff, 0.85);
    relleno.position.set(-5, 3, 2);
    escena.add(relleno);

    const controles = new OrbitControls(camara, renderer.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.08;
    controles.enablePan = false;
    controles.minDistance = 1.6;
    controles.maxDistance = 7;
    // Se limita la órbita vertical para que no se pueda mirar desde abajo del piso.
    controles.minPolarAngle = 0.15;
    controles.maxPolarAngle = Math.PI / 2 + 0.12;
    controles.autoRotate = !reducido;
    controles.autoRotateSpeed = 0.9;

    // trimesh exporta Z-up; three.js es Y-up. Se rota el grupo, no la cámara.
    const grupo = new THREE.Group();
    grupo.rotation.x = -Math.PI / 2;
    escena.add(grupo);

    const materiales = {
      tela: new THREE.MeshStandardMaterial({
        color: COLOR_TELA,
        roughness: 0.92,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
      tabique: new THREE.MeshStandardMaterial({
        color: COLOR_TABIQUE,
        roughness: 0.62,
        metalness: 0.05,
        side: THREE.DoubleSide,
        emissive: new THREE.Color(0x3a2f00),
      }),
      eslinga: new THREE.MeshStandardMaterial({
        color: COLOR_ESLINGA,
        roughness: 0.7,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      costura: new THREE.MeshStandardMaterial({
        color: COLOR_COSTURA,
        roughness: 0.75,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    };

    let cancelado = false;
    let cuadro = 0;
    const piezasTela = [];

    const loader = new GLTFLoader();
    loader.load(
      MODELO_URL,
      (gltf) => {
        if (cancelado) return;

        gltf.scene.traverse((obj) => {
          if (!obj.isMesh) return;

          // trimesh exporta sólo POSITION: sin normales la iluminación da cero
          // y el modelo se ve negro. Se calculan acá, una sola vez.
          if (!obj.geometry.getAttribute("normal")) {
            obj.geometry.computeVertexNormals();
          }

          const tipo = clasificar(obj.name || "");
          obj.material = materiales[tipo];
          if (tipo === "tela") piezasTela.push(obj);
        });

        // Se centra en X/Y y se apoya en Z=0, sin depender de números fijos del
        // archivo: si el modelo cambia, esto lo reencuadra igual.
        const caja = new THREE.Box3().setFromObject(gltf.scene);
        const centro = caja.getCenter(new THREE.Vector3());
        gltf.scene.position.x -= centro.x;
        gltf.scene.position.y -= centro.y;
        gltf.scene.position.z -= caja.min.z;

        grupo.add(gltf.scene);

        const alto = caja.max.z - caja.min.z;
        controles.target.set(0, alto * 0.45, 0);
        controles.update();

        setEstado("listo");
      },
      undefined,
      () => {
        if (!cancelado) setEstado("error");
      }
    );

    // El canvas sigue el tamaño real del contenedor (la card es fluida).
    const redimensionar = () => {
      const { clientWidth: w, clientHeight: h } = contenedor;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
    };
    redimensionar();
    const observador = new ResizeObserver(redimensionar);
    observador.observe(contenedor);

    const animar = () => {
      cuadro = requestAnimationFrame(animar);
      controles.update();
      renderer.render(escena, camara);
    };
    animar();

    // Se expone lo mínimo para que el toggle y el reset actúen desde fuera.
    apiRef.current = {
      piezasTela,
      materiales,
      controles,
      reencuadrar: () => {
        camara.position.set(2.35, -1.85, 1.95);
        controles.update();
      },
    };

    return () => {
      cancelado = true;
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      controles.dispose();
      Object.values(materiales).forEach((m) => m.dispose());
      escena.traverse((o) => {
        if (o.isMesh) o.geometry?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = null;
    };
  }, []);

  // Corte: las paredes se vuelven translúcidas para dejar ver los tabiques.
  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const { tela, tabique } = api.materiales;

    tela.transparent = corte;
    tela.opacity = corte ? 0.16 : 1;
    tela.depthWrite = !corte;
    tela.needsUpdate = true;

    // Los tabiques son paneles de tela, no bloques macizos: en corte se dejan
    // semitransparentes para que se lea la estructura completa (los dos
    // paneles cruzados) y no una masa amarilla sólida.
    tabique.transparent = corte;
    tabique.opacity = corte ? 0.72 : 1;
    tabique.depthWrite = !corte;
    tabique.needsUpdate = true;
  }, [corte, estado]);

  return (
    <div className={`visor3d ${className}`.trim()}>
      <div
        className="visor3d__lienzo"
        ref={contenedorRef}
        role="img"
        aria-label="Modelo 3D interactivo de un Big Bag compartimentado: se ven los tabiques internos que dividen el bolsón en cuatro compartimentos."
      />

      {estado === "cargando" && (
        <p className="visor3d__aviso" role="status">
          Cargando modelo 3D…
        </p>
      )}

      {estado === "error" && (
        <p className="visor3d__aviso visor3d__aviso--error" role="status">
          No se pudo cargar el modelo 3D en este dispositivo.
        </p>
      )}

      {estado === "listo" && (
        <>
          <p className="visor3d__pista" aria-hidden="true">
            Arrastrá para girarlo
          </p>

          <div className="visor3d__acciones">
            <button
              type="button"
              className={`visor3d__btn ${corte ? "is-activo" : ""}`}
              onClick={() => setCorte((v) => !v)}
              aria-pressed={corte}
            >
              {corte ? "Ver cerrado" : "Ver por dentro"}
            </button>
            <button
              type="button"
              className="visor3d__btn visor3d__btn--suave"
              onClick={() => apiRef.current?.reencuadrar()}
            >
              Reencuadrar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VisorBolson3D;
