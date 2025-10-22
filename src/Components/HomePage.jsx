import * as React from 'react';
import {useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
        <section>
            {/* seccion de inicio */}
            <h1>Hola mundo</h1>
        </section>
    </div>
  );
}