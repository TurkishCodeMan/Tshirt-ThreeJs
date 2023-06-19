import React from "react";
import { CanvasModel } from "./features/canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import { Leva } from "leva";
import { useSnapshot } from "valtio";
import state from "./store";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const snap = useSnapshot(state);
  return (
    <main className="app transition-all">
      <Home />
      <CanvasModel />
      <Customizer />
      <AnimatePresence>
        <motion.div className="absolute left-0 top-0">
          <Leva fill flat hidden={snap.intro} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default App;
