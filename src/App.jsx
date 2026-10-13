import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Historia from './components/Historia';
import GalleryLightbox from './components/GalleryLightbox';
// Componentes pausados para reactivación:
// import LaMagia from './components/LaMagia';
// import Tropas from './components/Tropas';
// import Filiales from './components/Filiales';
// import Identidad from './components/Identidad';
import LoginFraternoDrawer from './components/LoginFraternoDrawer';
import FraternoPortal from './components/FraternoPortal';
import ConvocatoriaModal from './components/ConvocatoriaModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [isMemberPortalOpen, setIsMemberPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [authenticatedFraterno, setAuthenticatedFraterno] = useState(null);

  const handleOpenMemberLogin = () => {
    // Si ya está autenticado, abre directamente el portal; si no, abre el drawer de login
    if (authenticatedFraterno) {
      setIsMemberPortalOpen(true);
    } else {
      setIsLoginDrawerOpen(true);
    }
  };

  const handleLoginSuccess = (fraternoData) => {
    setAuthenticatedFraterno(fraternoData);
    setIsLoginDrawerOpen(false);
    setIsMemberPortalOpen(true);
  };

  const handleLogout = () => {
    setAuthenticatedFraterno(null);
    setIsMemberPortalOpen(false);
    setIsLoginDrawerOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-simonDeep text-simonLight relative selection:bg-simonRed selection:text-white antialiased">
      {/* 1. Header & Dynamic Navbar */}
      <Navbar
        onOpenForm={() => setIsFormOpen(true)}
        onOpenMemberPortal={handleOpenMemberLogin}
      />

      <main>
        {/* 2. Hero Cinemático con Video y Admisión 2027 */}
        <Hero
          onOpenForm={() => setIsFormOpen(true)}
          onOpenMemberPortal={handleOpenMemberLogin}
        />

        {/* 3. #historia - Línea de Tiempo de los 30 Años (1996 a 2027) */}
        <Historia />

        {/* 4. #momentos - Galería Oficial Magic Moments con Lightbox Fullscreen */}
        <GalleryLightbox />

        {/* SECCIONES OCULTADAS TEMPORALMENTE (Para reactivar en siguiente fase):
        <LaMagia />
        <Filiales onOpenForm={() => setIsFormOpen(true)} />
        <Tropas onOpenForm={() => setIsFormOpen(true)} />
        <Identidad />
        */}
      </main>

      {/* 9. Footer con Redes Sociales Oficiales y Derechos */}
      <Footer
        onOpenForm={() => setIsFormOpen(true)}
        onOpenMemberPortal={handleOpenMemberLogin}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* MODALES Y PANELES INTERACTIVOS */}
      {/* Panel Lateral Deslizable de Login (Slide-Over Drawer) */}
      <LoginFraternoDrawer
        isOpen={isLoginDrawerOpen}
        onClose={() => setIsLoginDrawerOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenAdmin={() => {
          setIsLoginDrawerOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Portal Fraterno "Soy Simón de Corazón" */}
      <FraternoPortal
        isOpen={isMemberPortalOpen}
        onClose={() => setIsMemberPortalOpen(false)}
        fraternoData={authenticatedFraterno}
        onLogout={handleLogout}
      />

      {/* Embudo Inteligente de Admisión con Pase Digital */}
      <ConvocatoriaModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Panel de Control Oficial de Administración & Secretaría */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
