import React, { useRef, useState,useEffect } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { Parallax,ParallaxLayer } from '@react-spring/parallax'
import Tilt from 'react-parallax-tilt'
import emailjs from '@emailjs/browser'
import * as Accordion from '@radix-ui/react-accordion'
import { useLongPress } from 'use-long-press'
import {FaUser} from 'react-icons/fa'
import {useLocation} from 'react-router-dom'
const tabs=['Home','About','Projects','Skills','Contact']
function Landing() {
  const parallaxRef=useRef()
  const[activetab,setTab]=useState(tabs[0])
  const[flippedPages,setFlippedPages]=useState([])
  const[open,setOpen]=useState(false)
  const[openItems,setOpenItems]=useState([])
  const location=useLocation()
  const firstSet=["./image-11.png","./image-12.png","./image-13.png"]
  const secondSet=["./image-14.png","./image-16.png","./image-15.png"]
  const[showFirst,setShowFirst]=useState(true)
  const[skillsVisible,setSkillsVisible]=useState(true)
  const[final,setFinal]=useState(false)
  const skills=showFirst ? firstSet : secondSet
  const handleResetSkills=()=>{
    setSkillsVisible(false)
  }
  const handleExitComplete=()=>{
    setShowFirst((prev)=>!prev)
    setSkillsVisible(true)
  }
  const handleValueChange=(values)=>{
    setOpenItems(values)
  }
  const scrollToPage=(index)=>{
    parallaxRef.current.scrollTo(index)
    setTab(tabs[index])
    setOpen(false)
  }  
  const bind = useLongPress(()=>{
    console.log('Long pressed!')
  }, { threshold:500 })
  const onSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_m00uakw', 'template_nmevupu', e.target, '1bS4xm4yg31_FOHMh')
      .then((result) => {
        alert('Message sent successfully!')
        e.target.reset()
      }, (error) => {
        alert('Failed to send the message. Please try again later.')
      })
  }  
  const faqs=[
    {
      question: 'What services do you offer?',
      answer: 'I specialize in web development, UI/UX design, and creating responsive, high-performance websites.'
    },
    {
      question: 'What technologies do you work with?',
      answer: 'I mainly work with React, Django, CSS, and Postgresql. I am also familiar with other modern web technologies.'
    },
    {
      question: 'How can I contact you?',
      answer: 'You can reach me using the contact form on the website, or email me directly at hajrasultana7075@gmail.com.'
    },
    {
      question: 'Where can I see your previous work?',
      answer: `You can view my projects on the "Projects" section of this website or visit my GitHub profile for more-><a href="https://github.com/AYAZ2006" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">Click here</a>`
    }
  ]
  const[projects]=useState([
    {id:1, title:'Portfolio Website-1', description: 'Built using React and Framer Motion.', image: './image-1.png',link:'https://portfolio-devnexus.netlify.app/',image1:'https://cdn-icons-gif.flaticon.com/6454/6454035.gif' },
    {id:2, title:'Portfolio Website-2', description: 'Built with React,Framer Motion,TypeWriter and Accordion.', image: './image-2.png',link:'http://localhost:5173/',image1:'https://cdn-icons-gif.flaticon.com/6454/6454035.gif' },
    {id:3, title:'Resume_Builder', description: 'Created with Html,Css and JavaScript', image: './image-3.png',link:'https://github.com/AYAZ2006/resume_builder',image1:'https://cdn-icons-png.flaticon.com/128/5968/5968292.png' },
    {id:4, title:'Chat Application', description: 'Real-time chat app using WebSockets,Django and ReactJS', image: './image-4.png',link:'https://loopchat.vercel.app/',image1:'data:image/png;base64,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' },
  ])
  const pages=[
    {back:'./image-10.png'},
    {back:'./image-5.avif'},
    {back:'./image-6.avif'},
    {back:'./image-7.jpg'},
    {back:'./image-8.avif'},
    {back:'./image-9.avif'},
    {back:'./image-5.avif'},
  ]
  const handleFlip=(index)=>{
    if (!flippedPages.includes(index)){
      setFlippedPages([...flippedPages,index])
    }
  }
  const handleGoToPage=(pageNumber)=>{
    const flips=Array.from({length:pageNumber},(_,i)=>i)
    setFlippedPages(flips)
  }
  const handleReset=()=>{
    let copy=[...flippedPages]
    const interval=setInterval(()=>{
      if (copy.length===0){
        clearInterval(interval)
        return
      }
      copy.pop()
      setFlippedPages([...copy])
    },500)
  }
  return (
    <div className='starfield'>
      <motion.div animate={{x:['250%','-100%']}} transition={{repeat:0,duration:10,ease:'linear'}} style={{display:'inline-block',color:'red'}}>THIS PORTFOLIO WEBSITE IS BEST VIEWED IN DESKTOP ONLY.</motion.div>
      <button className={open ? 'hamburger-open':'hamburger-closed'} onClick={()=>setOpen(!open)}>☰</button>
      <div className={`menu ${open ? 'open' : ''}`}>
        {tabs.map((tab,index)=>(
          <button key={tab} onClick={()=>{scrollToPage(index);if(tab==='Home'){setFinal(false)}}} className='menu-button' style={{color:activetab===tab?'white':'#aaa'}}>
            {tab}
            {activetab===tab?(
              <motion.div layoutId='highlight' transition={{type:"spring",bounce:0.2,duration:0.6}} className='effect'></motion.div>
            ):null}
          </button>
        ))}
      </div>
      <Parallax pages={tabs.length} ref={parallaxRef}>
        {tabs.map((tab,index)=>(
          <ParallaxLayer key={tab} offset={index} speed={0.001}>
            <div style={{height: '100vh',display: 'flex',alignItems: 'center',justifyContent: 'center',color: 'white',fontSize: '3rem',}}>
              {tab==='Home' && <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:5,ease:'easeOut'}} className='home'>
                <div className='left'>
                <h1 style={{fontSize:'40px',marginTop:'-390px',position:'fixed'}} className='name-tilt'>HELLO IT'S MOHAMMED AYAZ</h1>
                {!final ? (
                <div className="typewriter-wrapper" style={{ display: 'inline-block',position:'fixed',marginTop:'-250px' }}>
                  <Typewriter
                    words={['I`M A Web Developer', 'I`M A UI/UX Designer', 'I`M A Freelancer','I`M A Full Stack Developer']}
                    loop={1} cursor cursorStyle='' typeSpeed={50} deleteSpeed={50} delaySpeed={1000} onLoopDone={()=>setFinal(true)}/>
                </div>
                  ):null}
                <p style={{fontSize:'25px'}}>I design and build beautiful digital experiences.<br/>A passionate Web Developer focused on creating user-friendly websites,blending creativity with technology to bring ideas to life.</p>
                <div className='down' style={{position:'relative'}}>
                  <button className='cv' style={{position:'relative'}}>
                    <a href='/Resume_1.pdf'>Download CV</a>
                  </button>
                  <button className='git' onClick={()=>window.open('https://github.com/AYAZ2006','_blank')} id='l'>
                    <img src='https://cdn-icons-png.flaticon.com/128/733/733553.png' style={{height:'100%',width:'100%',objectFit:'contain'}}></img>
                  </button>
                  <button className='linked-in' onClick={()=>window.open('https://www.linkedin.com/in/mohammed-ayaz-38ba06289/','_blank')} id='l'>
                    <img src='https://cdn-icons-png.flaticon.com/128/145/145807.png' style={{height:'100%',width:'100%',objectFit:'contain'}}></img>
                  </button>
                  <button className='twitter' onClick={()=>window.open('https://github.com/AYAZ2006','_blank')} id='l'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3670/3670127.png' style={{height:'100%',width:'100%',objectFit:'contain'}}></img>
                  </button>
                </div>
                <Tilt glareEnable={true} glareMaxOpacity={0} scale={1.05} style={{ width: '300px',marginTop:'-150px',marginLeft:'900px',position:'fixed' }} className='profile-tilt'>
                <div style={{width: '100%',height: '300px',borderRadius: '50%',backgroundColor: '#f0f0f0',display: 'flex',alignItems: 'center',justifyContent: 'center',boxShadow: '0 8px 20px rgba(0,0,0,0.2)',cursor:'pointer'}}>
                  <FaUser style={{ fontSize: '150px', color: '#555' }} />
                </div>
              </Tilt>
              </div>
              </motion.div>}
              {tab==='About' && <div className='about'>
                <div className="buttons">
                  {pages.map((_,index)=>(index!==0 && index!==pages.length-1 &&(
                    <button key={index} onClick={() => handleGoToPage(index)}>Page{index}</button>
                  )
                ))}
                <button onClick={handleReset}>Cover Page</button>
                </div>
                <div className="book">
                  {pages.map((content, index) => (
                    <div key={index} className={`page ${flippedPages.includes(index) ? "flipped" : ""}`} onClick={() => handleFlip(index)} style={{ zIndex: pages.length - index }}>
                    <div className="page-front">
                      <img src={content.back}></img>
                      </div>
                    <div className="page-back">
                      <img src={content.back}></img>
                      </div>
                </div>
                ))}
                </div>
                </div>}
              {tab==='Projects' && <div className='project'>
                <div style={{ padding: '40px', textAlign: 'center',marginTop:'-100px' }} className='upper-tilt'>
                    <h2 style={{marginTop:'-80px',position:'sticky'}}>Projects</h2>
                    <motion.div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '100px',marginLeft:'430px',whiteSpace: 'nowrap',}} animate={{x:['100%','-110%']}} transition={{repeat:Infinity,duration:25,ease:'linear'}} className='project-tilt'>
                      {projects.map((project) => (
                        <div key={project.id} onClick={() => window.open(project.link, '_blank')} style={{ width: '30vw', border: '1px solid #ddd', borderRadius: '10px', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',height:'50vh' }} className='move'>
                          <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '8px' }} />
                          <h3 style={{ fontSize: '30px', marginTop: '30px' }}>{project.title}</h3>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>}
              {tab==='Skills' && <div className='skill'>
                <div className="container">
                    <div className="buttons-tilt">
                      <button onClick={handleResetSkills}>
                        <img src='https://cdn-www.dora.run/__dora__/morpheus/static/images/ai/reload.png' style={{height:'50px',cursor:'pointer',marginLeft:'680px',position:'fixed',marginTop:'-100px'}}></img>
                      </button>
                    </div>
                    <div className="skills">
                      <AnimatePresence onExitComplete={handleExitComplete}>
                        {skillsVisible && skills.map((skill, index) => (
                            <motion.div key={skill} className="skill-box" initial={{ opacity: 0, y: 500 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 500 }} transition={{ duration: 1, delay: index * 0.1 }}>
                              <img src={skill} style={{width:'100%',objectFit:'contain'}}></img>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>}
                {tab==='Contact' && <div className='contact' style={{ width: '100%', height: '100vh', display: 'flex',alignItems: 'center',justifyContent: 'center',color: 'white'}}>
              <div id="contactleft">
                  <div id="given" style={{display:'flex'}}>
                    <div className="call" style={{marginLeft:'-1100px',height:'10px',border:'none',marginTop:'460px',position:'fixed'}}>
                      <img src="https://cdn-icons-png.flaticon.com/128/4213/4213179.png" alt="phone_no" className="phone"/>
                      <h3 style={{fontSize:'20px'}} classname='text-tilt'>7075118027</h3>
                    </div>
                    <div className="call" style={{border:'none',marginLeft:'-700px',marginTop:'450px',position:'fixed'}}>
                      <img src="https://cdn-icons-png.flaticon.com/128/7286/7286142.png" alt="email_id" className="phone"/>
                      <h3 style={{fontSize:'20px'}}>hajrasultana7075@gmail.com</h3>
                    </div>
                    <div className="call" style={{border:'none',marginTop:'450px',position:'fixed',marginLeft:'10px'}}>
                      <img src="https://cdn-icons-png.flaticon.com/128/684/684908.png" alt="location_id" className="phone"/>
                      <h3 style={{fontSize:'20px'}}>Hyderabad, B.H.E.L</h3>
                    </div>
                  </div>
                  <div id="input">
                    <h1 id="tagline" style={{marginLeft:'-1070px',marginTop:'-650px'}}>LET'S CONNECT</h1>
                    <form onSubmit={onSubmit}>
                      <div className="in" style={{marginLeft:'-700px',position:'fixed'}}>
                        <input type="text" name="name" placeholder="Your Name" id="in1" required style={{borderBottom:'3px solid #0ef',height:'50px',fontSize:'25px'}}/>
                      </div>
                      <div className="in" style={{marginLeft:'-700px',marginTop:'150px',position:'fixed'}}>
                        <input type="email" name="email" placeholder="Your Email" id="in2" required style={{borderBottom:'3px solid #0ef',height:'50px',fontSize:'25px'}}/>
                      </div>
                      <div className="in" style={{marginLeft:'-700px',marginTop:'190px',position:'fixed'}}>
                        <textarea name="message" placeholder="Your Message" id="in3" required style={{borderBottom:'3px solid #0ef',marginTop:'100px',height:'100px'}}></textarea>
                      </div>
                      <div className="in">
                        <button type="submit" id="enter" style={{cursor:'pointer',height:'50px',width:'250px',borderRadius:'50px',border:'3px solid #0ef',fontSize:'25px',position:'fixed',marginTop:'440px',marginLeft:'-600px'}}>SUBMIT</button>
                      </div>
                    </form>
                  </div>
                  <div style={{ maxWidth: '600px',marginLeft:'800px',position:'fixed',marginTop:'-150px'}}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>FAQs</h2>  
                    <Accordion.Root type="multiple" value={openItems} onValueChange={handleValueChange}>
                      {faqs.map((faq,index)=>{
                        const value=`item-${index}`
                        const isOpen=openItems.includes(value)
                        return (
                          <Accordion.Item key={index} value={value} style={{ borderBottom: '1px solid #ddd' }}>
                            <Accordion.Header>
                              <Accordion.Trigger style={{ all: 'unset', fontSize: '24px', fontWeight: 'bold', padding: '20px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',cursor: 'pointer' }}>
                                {faq.question}
                                <motion.span animate={{ rotate: isOpen ? 45 : 0 }}transition={{ duration: 0.3 }}style={{ fontSize: '30px' }}>+</motion.span>
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <Accordion.Content asChild>
                                  <motion.div initial={{ height: 0, opacity: 0 }}animate={{ height: 'auto', opacity: 1 }}exit={{ height: 0, opacity: 0 }}transition={{ duration: 0.4, ease: 'easeInOut' }}style={{ overflow: 'hidden', padding: '0 20px' }}>
                                    <div style={{ padding: '10px 0', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                  </motion.div>
                                </Accordion.Content>
                              )}
                            </AnimatePresence>
                          </Accordion.Item>
                        )
                      })}
                    </Accordion.Root>
                  </div>
                </div>
                </div>}
            </div>
          </ParallaxLayer>
        ))}
      </Parallax>
    </div>
  )
}

export default Landing
