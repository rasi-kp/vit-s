import React from 'react';
import { Link } from 'react-router-dom';

export default function AddProgram() {
    return (
        <div className='addinstitute-container'>
            <button>
                <Link to={{ pathname: '/admin' }}>
                    <img src='../img/back-arrow.png' alt='back-arrow' className='back-arrow' />
                </Link>
            </button>
            <section>
                <h1 className='section-title'>Add Courses</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }} className='section-title-p'>
                    <p>Course Category</p>
                    <select className='select-addprogram'>
                        <option>Short Course</option>
                        <option>Diploma</option>
                    </select>
                </div>

                <div className='add-institute-form'>
                    <form className='forms'>
                        <div>
                            <h1 className='starlabel'>Institute Name</h1>
                            <select >
                                <option>Institute Name</option>
                                <option>ABC</option>
                            </select>
                        </div>
                        <div>
                            <h1 className='starlabel'>Course Name</h1>
                            <input type='text' placeholder='Eg : Animation, visual effects' />
                        </div>
                        <div>
                            <h1 className='starlabel'>Course Descprition</h1>

                            <input type='text' placeholder='Eg: Data structures and algorithms' important />
                        </div>
                        <div>
                            <h1 className='starlabel'>
                                Sub Category
                            </h1>
                            <div className='select'>
                                <select>
                                    <option value='Kannur'>marketing</option>
                                    <option value='Bangalore'>Web dev</option>
                                </select>
                            </div>
                            <button className='add-btn'><img src='../img/add-icon.png' alt='add-icon' className='add-icon'></img>Add Subcourse</button>
                        </div>
                        <div className='course-duration'>
                            <h1>Course Duration</h1>
                            <div>
                                <select>
                                    <option>Year</option>
                                </select>
                                <select>
                                    <option>Month</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h1 className='starlabel'>Course Curriculum</h1>
                            <p style={{ color: 'grey', fontSize: '16px', marginBottom: '10px' }}>Introducing of Marketing</p>
                            <input type='text' />
                        </div>
                        <div>
                            <h1>Contact Fee</h1>
                            <button style={{ padding: '10px', border: '2px solid #ffc900', borderRadius: '15px', marginRight: '10px' }}>Month</button>
                            <button style={{ padding: '10px', border: '2px solid grey', borderRadius: '15px', marginRight: '10px' }}>Year</button>
                            <button style={{ padding: '10px', border: '2px solid grey', borderRadius: '15px' }}>Total</button>
                        </div>
                        <button type='submit' className='submit' style={{ alignSelf: 'flex-end' }}>Submit</button>
                    </form>
                    {/* <div className='upload'>
                        <div className='upload-container'>
                            <button className='add-btn'><img src='../img/add-icon.png' alt='add-icon' style={{ width: '40px' }}></img></button>
                            <button className='upload-btn'>Upload your logo</button>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    )
}
