import React from 'react';
import styles from './ErrorPage.css'
import { Link } from 'react-router-dom';



const ErrorPage = () => {
    return (
        <>
            <div className={styles.textWrapper}>
                <div className={styles.title} data-content="404">
                    404
                </div>

                <div className={styles.subtitle} data-content="Oops, the page you're looking for doesn't exist">
                    Oops, the page you're looking for doesn't exist.
                </div>

                <div className={styles.buttons}>
                    <Link to='/' className={styles.button}>Go to homepage</Link>
                </div>
            </div>
        </>
    );
}


export default ErrorPage;