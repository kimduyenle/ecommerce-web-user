import React from 'react'
import Header from './Header'
import Footer from './Footer';

const Layout = ({ Content, ...props }) => {
  return (
    <div className="app_layout">
      <Header />
      <Content {...props} />
      <Footer />
    </div>
  )
}

Layout.propTypes = {}
export default Layout
