import React from 'react';
import { Link } from 'react-router-dom'
export default function Contact() {
    return (
        <>
            <section className='contact-area'>
                <div className='contact-contents'>
                    <div className='contact-card'>
                        <h6>Connect with us:</h6>
                        <p className='contact-card-p'><a href="mailto:admin.sp@savvypool.com">admin.sp@savvypool.com</a></p>
                    </div>
                    <div className='contact-card'>
                        <h6>Enroll in our Student Ambassador Program:</h6>
                        <p className='contact-card-p'><a href="https://gc05gfdr62r.typeform.com/to/bw43QnR5">Click Here To Register</a></p>
                    </div>
                    <div className='contact-card'>
                        <h6><Link to='/docs/privacyPolicy'>Privacy Policy</Link></h6>
                        <p><Link to="/docs/termsofUse">Terms and conditions</Link></p>
                    </div>
                    <div className='contact-card'>
                        <h6>Follow us:</h6>
                        <div className='Social-icons'>
                            <a href="https://www.linkedin.com/company/savvypool/"><img src='/img/LinkedIn.svg' alt='social-icon'></img></a>
                            <a href='https://www.instagram.com/savvypool/?igshid=MzRlOBiNWFIZA%3D%3D'><img src='/img/Instagram.svg' alt='social-icon'></img></a>
                            <a href="https://twitter.com/savvy_pool?t=3gfF87t58a91-OvesDA&s=08"><img src='/img/X.svg' alt='social-icon'></img></a>
                            <a href="https://www.facebook.com/profile.php?id=100088552688048&mibextid=ZBWKWL"><img src='/img/Facebook.svg' alt='social-icon'></img></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}