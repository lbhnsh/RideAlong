import React from 'react';

const services = [
  {
    id: 1,
    title: "Cab Service",
    description: "Fast and reliable cab rides for individuals or small groups.",
    imgSrc: "/car.png"
  },
  {
    id: 2,
    title: "Shared Ride",
    description: "Affordable shared rides with fellow passengers heading in the same direction.",
    imgSrc: "/carpool.svg"
  },
  {
    id: 3,
    title: "Bike Service",
    description: "Quick and eco-friendly bike rides for short distances.",
    imgSrc: "/bik.jpg"
  },
];

const ServicesSection = () => {
  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      // backgroundColor: '#f0f0f0',
      // color: '#333',
    },
    header: {
      background: '#333',
      color: 'white',
      padding: '10px 0',
    },
    navList: {
      display: 'flex',
      justifyContent: 'center',
      listStyle: 'none',
      padding: 0,
    },
    navItem: {
      margin: '0 20px',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
    },
    navLinkHover: {
      textDecoration: 'underline',
    },
    servicesSection: {
      padding: '40px',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '3rem',
      marginBottom: '20px',
      // color: '#4f5bd5',
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '40px',
      color: '#666',
    },
    servicesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
    },
    serviceCard: {
      background: '#2a2a3d',
      color: 'white',
      width: '250px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    serviceCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    },
    serviceImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    serviceTitle: {
      marginTop: '15px',
      fontSize: '1.5rem',
      // color: '#fa7e1e',
    },
    serviceDescription: {
      fontSize: '1rem',
      marginTop: '10px',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      background: '#333',
      color: 'white',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.page}>
      

      <main>
        <section style={styles.servicesSection}>
          <h1 style={styles.sectionTitle}>Our Services</h1>
          <p style={styles.description}>
            We provide a range of ride-sharing options to make your commute easier, affordable, and comfortable. Check out the services we offer!
          </p>

          <div style={styles.servicesContainer}>
            {services.map((service) => (
              <div
                key={service.id}
                style={{ ...styles.serviceCard, ':hover': styles.serviceCardHover }}
              >
                <img
                  src={service.imgSrc}
                  alt={service.title}
                  style={styles.serviceImage}
                />
                <h3 style={styles.serviceTitle}>{service.title}</h3>
                <p style={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 RideShare Co. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicesSection;
