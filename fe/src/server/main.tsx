import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ServerApp } from './App';

hydrateRoot(document, <ServerApp />);
