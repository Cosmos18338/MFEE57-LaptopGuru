import React from 'react';
import styles from '@/styles/signUpForm.module.scss';
import Link from 'next/link';

export default function LogIn(props) {
  return (
    <div className={styles['gradient-bg']}>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center gx-5">
      <div className={`${styles.blur} ${styles.white}`}>blur</div>
          <div className={`${styles.left} col-sm-1 col-md-2`}>
            <h4 className={styles.white}>Welcome to</h4>
            <br />
            <h3 className={`${styles.white} ${styles['guru-laptop']}`}>GURU Laptop</h3>
          </div>
          <div className={`${styles.right} col-sm-12 col-md-4`}>
            <div className={`${styles.tabs} d-flex justify-content-between`}>
              <h7 className={`${styles.white} ${styles.hover}`}>
                <Link href="/signup-test/login">Log in</Link>
              </h7>
              <h7 className={styles.white}>|</h7>
              <h7 className={`${styles.white} ${styles.hover}`}>
                <Link href="/member/signup-2
                ">Sign up</Link>
              </h7>
            </div>
            <form className="mt-5 position-relative d-flex justify-content-center align-items-center">
              <div className="inputs position-relative">
                <label htmlFor="email" className={styles.white}>帳號(信箱)</label>
                <input type="email" className={`${styles['custom-input']} form-control`} name="email" />
                <label htmlFor="inputPassword5" className={`form-label ${styles.white} ${styles['custom-label']} mt-5`}>密碼</label>
                <input type="password" id="inputPassword5" className={`form-control ${styles['custom-input']}`} aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className={`form-text ${styles.white} p-5`}>
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
                <button className={styles.button} type="submit">送出</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
