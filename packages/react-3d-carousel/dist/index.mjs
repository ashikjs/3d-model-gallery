"use client";
import { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

function UniversalModel({ modelUrl, rotation, position = [0, -0.8, 0], scale = 1.5 }) {
  const meshRef = useRef();
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const loadModel = async () => {
      try {
        setLoading(true);
        const fileExtension = modelUrl.split(".").pop().toLowerCase();
        let loadedModel;
        switch (fileExtension) {
          case "glb":
          case "gltf":
            const gltfLoader = new GLTFLoader();
            loadedModel = await new Promise((resolve, reject) => {
              gltfLoader.load(
                modelUrl,
                (gltf) => resolve(gltf.scene),
                void 0,
                reject
              );
            });
            break;
          case "obj":
            const objLoader = new OBJLoader();
            loadedModel = await new Promise((resolve, reject) => {
              objLoader.load(
                modelUrl,
                (obj) => resolve(obj),
                void 0,
                reject
              );
            });
            break;
          case "fbx":
            const fbxLoader = new FBXLoader();
            loadedModel = await new Promise((resolve, reject) => {
              fbxLoader.load(
                modelUrl,
                (fbx) => resolve(fbx),
                void 0,
                reject
              );
            });
            break;
          default:
            throw new Error(`Unsupported file format: ${fileExtension}`);
        }
        if (isMounted) {
          setModel(loadedModel);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load 3D model:", err);
        if (isMounted) {
          setError(err.message || "Failed to load 3D model");
          setLoading(false);
        }
      }
    };
    loadModel();
    return () => {
      isMounted = false;
    };
  }, [modelUrl]);
  const transforms = useMemo(() => {
    if (!model) return null;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const autoScale = 3.5 / maxDim;
    return {
      scale: autoScale,
      position: [
        -center.x * autoScale,
        -center.y * autoScale,
        -center.z * autoScale
      ]
    };
  }, [model]);
  if (error || loading || !model || !transforms) {
    return null;
  }
  return /* @__PURE__ */ jsx("group", { rotation: [0, rotation, 0], children: /* @__PURE__ */ jsx(
    "primitive",
    {
      ref: meshRef,
      object: model,
      scale: transforms.scale,
      position: transforms.position
    }
  ) });
}
function ProductViewer({
  modelUrl,
  height = "100vh",
  overlay = null,
  scrollMultiplier = 4
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalScrollHeight = scrollMultiplier * viewportHeight - viewportHeight;
      const progress = Math.min(Math.max(scrollTop / totalScrollHeight, 0), 1);
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollMultiplier]);
  const rotation = scrollProgress * Math.PI * 2;
  return /* @__PURE__ */ jsx("div", { className: "relative", style: { height: `${scrollMultiplier * 100}vh` }, children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 w-full bg-linear-to-b from-slate-900 to-slate-700", style: { height }, children: [
    overlay && /* @__PURE__ */ jsx("div", { className: "absolute bottom-12 left-0 right-0 z-10 px-8 pb-8 pointer-events-none flex justify-center", children: overlay }),
    /* @__PURE__ */ jsxs(
      Canvas,
      {
        camera: { position: [0, 0, 5], fov: 50 },
        style: { background: "linear-gradient(to bottom, #0f172a, #334155)" },
        gl: {
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        },
        onCreated: ({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost, attempting to restore...");
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            console.log("WebGL context restored");
          });
        },
        children: [
          /* @__PURE__ */ jsx("ambientLight", { intensity: 0.5 }),
          /* @__PURE__ */ jsx("directionalLight", { position: [10, 10, 5], intensity: 1 }),
          /* @__PURE__ */ jsx("directionalLight", { position: [-10, -10, -5], intensity: 0.5 }),
          /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
            UniversalModel,
            {
              modelUrl,
              rotation
            }
          ) }),
          /* @__PURE__ */ jsx(OrbitControls, { enableZoom: false, enablePan: false, enabled: false })
        ]
      }
    )
  ] }) });
}
function GalleryCarousel({
  models,
  showNavigation = false,
  showArrows = false,
  showDots = false,
  isLoading = false,
  error = null,
  height = "80vh",
  scrollMultiplier = 4
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "h-screen w-full flex items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70", children: "Loading Gallery..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-slate-900 to-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "text-center px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2", children: "3D Gallery" }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/60 drop-shadow-md mb-4", children: error }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/40", children: "Please check back later" })
    ] }) });
  }
  if (!models || models.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "h-screen w-full flex items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white text-2xl font-bold mb-2", children: "No Models Available" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Please check back later" })
    ] }) });
  }
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length);
  };
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
  };
  useEffect(() => {
    if (!showNavigation || models.length <= 1) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNavigation, models.length]);
  const currentModel = models[currentIndex];
  const overlay = /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2", children: currentModel.name }),
    /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/80 drop-shadow-md mb-4", children: currentModel.description }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2 text-sm text-white/60", children: /* @__PURE__ */ jsxs("span", { children: [
      currentIndex + 1,
      " / ",
      models.length
    ] }) })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
      ProductViewer,
      {
        modelUrl: currentModel.modelUrl,
        height: height || currentModel.height,
        overlay,
        scrollMultiplier
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none", style: { height: height || "80vh" }, children: [
      showNavigation && showArrows && models.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goToPrevious,
            className: "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg border border-white/30",
            "aria-label": "Previous model",
            children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M15 19l-7-7 7-7" }) })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goToNext,
            className: "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg border border-white/30",
            "aria-label": "Next model",
            children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M9 5l7 7-7 7" }) })
          }
        ) })
      ] }),
      showNavigation && showDots && models.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2 pointer-events-auto", children: models.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentIndex(index),
          className: `w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"}`,
          "aria-label": `Go to model ${index + 1}`
        },
        index
      )) })
    ] })
  ] });
}

export { GalleryCarousel };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map
