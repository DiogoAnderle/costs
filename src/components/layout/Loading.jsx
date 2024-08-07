import styles from './Loading.module.css'

import loading from '../../img/loading.svg'

function Loading(){
    return(
        <div className={styles.loader_container}>
            <img src={loading} className={styles.loader} alt="loading-svg" />
        </div>
    )
}

export default Loading;