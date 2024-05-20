import * as React from "react";


function Footer() {
    return <footer>
        <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
            A Kard és Mágiát Lux Gábor alkotta. A szerzői jogok őt illetik. Ez az oldal egy "rajongói
            hozzájárulás", célja a Kard és Mágia népszerűsítése. Ha többet akarsz tudni a Kard és Mágiáról
            látogass el a <a href="https://fomalhaut.lfg.hu/">hivatalos honlapjára</a>. A Kard és Mágia az Open
            Gaming Licence 1.0a alatt lett kiadva, melynek szövege <a href="/ogl.html">itt található</a>
            A Kard és Mágia második kiadása az AELF Open License version 1.0a alatt lett kiadva melynek szövegét <a href="/aelf.html">itt találod.</a> “This work includes AELF Open Gaming Content, which may only be used under the terms of the AELF Open License version 1.0a. This product is not endorsed or reviewed by Mythmere Games LLC or any other contributor of AELF Open Gaming Content and does not represent the views of Mythmere Games LLC or any other contributor.”
        </div>
    </footer>
}

export default Footer;