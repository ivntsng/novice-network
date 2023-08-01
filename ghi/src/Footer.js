import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="text-center text-white" style={{backgroundColor: '#757191',}}>
        <div className="container p-4 pb-0">
            <section className="mb-4" >
            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#3b5998',}}
                href="#!"
                role="button"
                ><i className="bi bi-facebook"></i
            ></Link>

            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#55acee',}}
                href="#!"
                role="button"
                ><i className="bi bi-twitter"></i
            ></Link>

            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#dd4b39',}}
                href="#!"
                role="button"
                ><i className="bi bi-google"></i
            ></Link>

            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#ac2bac',}}
                href="#!"
                role="button"
                ><i className="bi bi-instagram"></i
            ></Link>

            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#0082ca'}}
                href="#!"
                role="button"
                ><i className="bi bi-linkedin"></i
            ></Link>

            <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#333333',}}
                href="#!"
                role="button"
                ><i className="bi bi-github"></i
            ></Link>
            </section>

        </div>

        <div className="text-center p-3" style={{backgroundColor: '#231d3c',}}>
            © 2023 Copyright:
            <Link className="text-white" to="/">NoviceNetwork</Link>
        </div>
        </footer>
    );
}

export default Footer;
