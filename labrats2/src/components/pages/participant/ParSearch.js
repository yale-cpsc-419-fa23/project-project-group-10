import React from 'react';
import '../../../App.css';
import '../../HeroSection.css';
import { Link } from 'react-router-dom';

function ParSearch() {
    return (
        <div>
            <div className='hero-container'>
                <h1 className="register-title">Search for Studies</h1>
                <form action="/participant-search" method="POST">
                    <div class="form-container">
                        <div class="form-group">
                            <label class="label"></label>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default ParSearch