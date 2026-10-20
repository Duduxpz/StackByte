import { useEffect, useRef } from 'react';
import html from '../newhome/home.html?raw';
import initHome from '../newhome/homeInit.js';
import '../newhome/home.css';

// Nova home da StackByte. O CSS e o HTML ficam isolados em .sbh para não afetar as outras páginas.
export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = [root.style.scrollBehavior, root.style.scrollPaddingTop];
    root.style.scrollBehavior = 'smooth';
    root.style.scrollPaddingTop = '90px';
    const cleanup = initHome();
    return () => {
      cleanup();
      root.style.scrollBehavior = prev[0];
      root.style.scrollPaddingTop = prev[1];
    };
  }, []);

  return <div className="sbh" ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
