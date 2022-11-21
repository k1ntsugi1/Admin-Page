import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BackgroundCircles } from '../components/BackgroundCircles/BackgroundCircles';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarToggler } from '../components/SidebarToggler/SidebarToggler';
import { HomePage } from '../pages/HomePage';
export const App: React.FC = () => {
  return (
    <div className="vh-100 vw-100 overflow-hidden">
      <Sidebar sizeOfNavItems="s" />
      <SidebarToggler sizeOfToggler="m" />
      <div className="h-100 w-100 overflow-auto">
        <HomePage />
      </div>
      <BackgroundCircles />
      <BackgroundGlass />
      <HomePage />
    </div>
  );
};
