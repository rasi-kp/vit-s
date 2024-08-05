import React from 'react'

export default function Testimonial() {
    return (
        <>
            <div className='testimonial'>
                <div className='title-div'>
                    <hr className='line' />
                    <h1 className='test-title'>What our Course Finders have to say</h1>
                    <hr className='line' />
                </div>

                <div className='test-container'>
                    <div className='test-cards'>
                        <img src='/img/testimonial-1.png' alt='testimonial' className='testmonial-image'></img>
                        <div className='test-content'>
                            <h1>Rohit Raghav</h1>
                            <p>"I stumbled upon this website and struck gold! Found a killer online marketing course that didn't mess with my schedule. The site is easy to use, and the courses are top-notch."</p>
                        </div>
                    </div>
                    <div className='test-cards'>
                        <img src='/img/testimonial-2.png' alt='testimonial' className='testmonial-image'></img>
                        <div className='test-content'>
                            <h1>Neha P</h1>
                            <p>"Being a 9-to-5 warrior, I needed courses that fit my weekends. This website hooked me up with some solid offline courses. Easy info – made my pick a breeze."</p>
                        </div>
                    </div>
                    <div className='test-cards'>
                        <img src='/img/testimonial-3.png' alt='testimonial' className='testmonial-image'></img>
                        <div className='test-content'>
                            <h1>Sanjay K</h1>
                            <p>"This site made finding online courses a breeze. I dove into a coding bootcamp that turned my job around. Easy to navigate– totally recommend for anyone hunting good courses."</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}