import React from 'react'
export default function Features() {
    return (
        <>
            <div className='features'>
                <div className='features-container'>
                    <div className='features-img'> <img src='/img/search course ui pic (4).png' className='image_course' alt='course-image'></img></div>
                    <div className='features-content'>
                        <h1>Explore diverse courses</h1>
                        <p>Empowering you to access a wide range of short courses and certifications online or at nearby institutes, whether in your city, state, or any other countries effortlessly.</p>
                    </div>
                </div>
                <div className='features-container1'>
                    <div className='features-img'> <img src='/img/course ui pic New (1).png' className='image_course' alt='course-image'></img></div>
                    <div className='features-content'>
                        <h1>Convenient and informed decisions</h1>
                        <p>Easily access insights about appropriate courses, allowing you to make informed decisions without wasting hours researching or consulting multiple sources.</p>
                    </div>
                </div>
                <div className='features-container'>
                    <div className='features-img'> <img src='/img/profile building.png' className='image_course' alt='course-image'></img></div>
                    <div className='features-content'>
                        <h1>Build your educational portfolio</h1>
                        <p className='last-p'>Showcase the skills and expertise you have with earned certifications, raising your profile among employers or academic pursuits.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
