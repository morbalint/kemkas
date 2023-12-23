import * as React from "react";

function ErrorBoundary(props: {}) {
    
    return <div>
        <div className="container-fluid p-5 bg-danger text-white text-center">
            <h1>Valami hiba történt :(</h1>
        </div>
        <div className="p-5 text-center">
            <p>Töltsd újra az oldalt, és ha az sem segít lépj kapcsolatba a fejlesztővel a <a href="mailto:developer@kemkas.hu">developer@kemkas.hu</a> email címen!</p>
            <p>Kérlek vedd figyelembe, hogy ez egy hobby projekt limitált erőforrásokkal.</p>
        </div>
    </div>
}

export default ErrorBoundary;