import React from 'react';
import { Link } from 'react-router-dom';

const style = {
    authLink: {
        textDecoration: 'none',
        color: '#000',
        marginRight: '10px'
    }
};


   function App() {
    const serviceref = React.useRef(null);
    const scrollToServices = () => {
        if (serviceref.current) {
            serviceref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="app-container flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
            <header className="header flex justify-between items-center p-5 w-full">
                <div className="logo text-2xl font-bold">ChatShark</div>
                <nav className="navigation flex space-x-5">
                    <a href="#home" className="text-gray-400 hover:text-white">Home</a>
                    <a href="#services" onClick={scrollToServices} className="text-gray-400 hover:text-white">Services</a>
                    <a href="#about" className="text-gray-400 hover:text-white">About</a>
                    <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
                </nav>
                <div className="auth flex items-center space-x-5">
                    <Link to="/login" className="text-blue-500 hover:text-white">Login</Link>
                    <Link to="/signup" className="sign-up-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
                </div>
            </header>

            <main className="main-content p-10">
                <div className="hero-section flex items-center gap-10">
                    <div className="hero-text flex-1">
                        <h1 className="hero-heading text-4xl font-bold mb-5 text-gray-300">Welcome to our community</h1>
                        <p className="hero-description text-lg text-gray-400 mb-5 leading-relaxed">
                            Our friendly chatbot is here to enhance your experience. Whether you have questions, need assistance, or just want to chat, we're here for you! Think of it as your always-available guide, helping you discover valuable conversations.
                        </p>
                        <div className="hero-buttons flex space-x-5">
                            <button className="getStartedButton bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700">Get Started</button>
                            <button className="learnMoreButton border border-gray-400 text-gray-400 px-5 py-2 rounded hover:text-white hover:border-white">Learn More</button>
                        </div>
                    </div>
                    <div className="hero-image-container flex-1 relative">
                        
                        <img src="/codechatbot.jpg" alt="chatbotimage" className="hero-image w-full rounded-lg" />
                    </div>
                </div>
            </main>

            <section ref={serviceref} className="services-section py-10 bg-gray-800 text-center">
                <h2 className="services-title text-3xl font-bold mb-5 text-white">Our Services</h2>
                <p className="services-description text-lg text-gray-400 mb-10 leading-relaxed">
                    We offer a range of services to enhance your community experience.
                </p>
                <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
                    <div className="service-card bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
                        <img src="/image.jpg" alt="service1" className="service-image w-full h-32 object-cover rounded mb-5" />
                        <h3 className="service-title text-xl font-bold text-white mb-3">Real Time Chatting</h3>
                        <p className="service-name text-gray-400">
                            24/7 Engage in real-time conversations with our community chatbot. Get instant responses to your queries and enjoy seamless interactions.
                        </p>
                    </div>
                    <div className="service-card bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
                        <img src="/image.jpg" alt="service2" className="service-image w-full h-32 object-cover rounded mb-5" />
                        <h3 className="service-title text-xl font-bold text-white mb-3">Video Calling</h3>
                        <p className="service-name text-gray-400">
                            Connect with our community through voice calls. Enjoy clear and reliable communication with our chatbot.
                        </p>
                    </div>
                    <div className="service-card bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
                        <img src="/image.jpg" alt="service3" className="service-image w-full h-32 object-cover rounded mb-5" />
                        <h3 className="service-title text-xl font-bold text-white mb-3">Community Chatting</h3>
                        <p className="service-name text-gray-400">
                            Join group conversations and engage with like-minded individuals. Our chatbot helps facilitate meaningful discussions.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
                }
    
    const Footer = () => {
        return (
        <footer className="footer flex flex-col pt-2 w-full pl-2 ">
            <div>
            <div className="footer-container ">
                <div className="logo-area ">
                    
                    <div className="social-icons flex ">
                        <a href="#" target="_blank" rel='noopener noreferrer' className="social-icon-link scale-[0.8]">
                            <img src='/image1.jpg' alt='Facebook' className='social-icon scale-[0.8]' style={{ width: '45px', height: '45px'}}/></a>
                        <a href="#" target="_blank" rel='noopener noreferrer' className="social-icon-link scale-[0.8]">
                            <img src='./image3.jpg' alt='Instagram' className='social-icon scale-[0.8]' style={{ width: '45px', height: '45px'}}/></a>
                        <a href="#" target="_blank" rel='noopener noreferrer' className="social-icon-link scale-[0.8]">
                            <img src='/image5.jpg' alt='Linkedin' className='social-icon scale-[0.8]'style={{ width: '45px', height: '45px'}}/></a>
                        <a href="#" target="_blank" rel='noopener noreferrer' className="social-icon-link scale-[0.8]">
                            <img src='/image2.jpg' alt='Twitter' className='social-icon scale-[0.8]' style={{ width: '45px', height: '45px'}}/></a>
                    </div>
                </div>
            </div>

            <div className="footer-column">
                <h3 className='footer-heading'>Quick Links</h3>
                <ul className='footer-list'>
                    <li><a href="#home" className='link'>Home</a></li>
                    <li><a href="#about" className='link'>About Us</a></li>
                    <li><a href='#services' className='link'>Services</a></li>
                    
                </ul>
                </div>
       
                </div>
                <div className='footer-bottom w-full text-center'>
                    <p className='copyright text-blue-700'>© 2025 ChatShark. All rights reserved.</p>
                    <div className='legal-links text-sm text-blue-700'>
                        <a href='#privacy' className='legal-links'>Privacy Policy
                            </a>
                        <a href='#terms' className='legal-links'>Terms of Service</a>
                        <a href="cookies" className='legal-links'>Cookies</a>
                        </div>
                </div>
        </footer>
    );
};
export default App;
export { Footer };