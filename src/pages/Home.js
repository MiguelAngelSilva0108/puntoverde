import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <div>
            <div className="customRectangle">
                <div>
                    <img
                        src="https://reciclamas.com.mx/wp-content/uploads/2020/03/HORIZONTAL-2.png"
                        alt="Reduce, Reuse, Recycle"
                        className="responsiveImage"
                    />
                    <div className="textContent">
                        <p>
                            Punto Verde es un proyecto hecho por alumnos del IPN (UPIICSA) para incentivar el reciclaje. Ayudamos a ciudadanos y empresas a encontrar su mejor opción para iniciar en el reciclaje.
                        </p>
                    </div>
                </div>
                <img
                    src="https://cdn.goconqr.com/uploads/media/image/22004721/desktop_6398164f-7841-45cb-aba7-d03344991822.png"
                    alt="LogoUPIICSA"
                    className="logoupiicsa"
                />
            </div>
        </div>
    );
}

export default Home;
