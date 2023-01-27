import React from 'react'
import styles from '../../pages/components/ImageComp.module.css'
import Image from 'next/image'
const ImageComp = () => {
  return (
    <div>
      <>
        <div className={styles.divglobal}>
          <span className={styles.text25}>
            Всё для комфортной
            <br></br>
            работы
          </span>
          <div className={styles.banner1}>
            <Image
              width="180"
              height="114"
              alt="image550363"
              src="/playground_assets/image550363-qxm-200h.png"
              className={styles.image55}
            />
            <Image
              width="187"
              height="114"
              alt="Subtract0364"
              src="/playground_assets/subtract0364-y7rf.svg"
              className={styles.image29}
            />
            <div className={styles.divimage34}>
              <Image
                width="71"
                height="24"
                alt="Rectangle450369"
                src="/playground_assets/rectangle450369-wou9.svg"
                className={styles.image45}
              />
              <span className={styles.text05}>
                - 25%
                <br />
                на товары
                <br />
                для кабинета
              </span>
            </div>
            <div className={styles.divimage1}>
              <Image
                width="20"
                height="20"
                alt="Rectangle250372"
                src="/playground_assets/rectangle250372-1drr-200h.png"
                className={styles.image25}
              />
            </div>
          </div>
          <div className={styles.banner2}>
            <Image
              width="305"
              height="140"
              alt="Rectangle280376"
              src="/playground_assets/rectangle280376-lij7-400w.png"
              className={styles.image28}
            />
            <Image
              width="180"
              height="140"
              alt="image600377"
              src="/playground_assets/image600377-xj27-200h.png"
              className={styles.image60}
            />
            <div className={styles.imagediv34}>
              <Image
                width="59"
                height="24"
                alt="Rectangle450395"
                src="/playground_assets/rectangle450395-buqb.svg"
                className={styles.image451}
              />
              <span className={styles.text16}>
                <span className={styles.text17}>Скидка</span>

                <span> - 10%</span>
                <br></br>

                <span>на периферию</span>
                <br></br>
                <span>для компьютера</span>
              </span>
            </div>
            <div className={styles.divimage41}>
              <Image
                width="20"
                height="20"
                alt="Rectangle250398"
                src="/playground_assets/rectangle250398-r6rq-200h.png"
                className={styles.image251}
              />
              <span className={styles.text22}>Выбрать</span>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default ImageComp
