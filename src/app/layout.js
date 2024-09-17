'use client';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CommonProvider } from '@/commons/contexts/CommonContext';
import { UserInfoProvider } from '@/commons/contexts/UserInfoContext';
import SiteTitle from '@/commons/components/SiteTitle';
import Header from '@/outlines/Header';
import MainMenu from '@/outlines/MainMenu';
import SubMenus from '@/outlines/SubMenus';
import { theme } from '../theme';
import '../i18n';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UserInfoProvider>
        <CommonProvider>
          <html lang="en">
            <head>
              <SiteTitle />
            </head>
            <body>
              <Header />
              <main>
                <MainMenu />
                <section className="main-content">
                  <SubMenus />
                  {children}
                </section>
              </main>
            </body>
          </html>
        </CommonProvider>
      </UserInfoProvider>
    </ThemeProvider>
  );
}
