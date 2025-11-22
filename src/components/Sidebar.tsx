import './Sidebar.css';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="promo-card">
        <h3>GreatFrontEnd – Front End Interview preparation</h3>
        <p>
          Built by ex-staff engineers from Meta and Google, GreatFrontEnd is the best way to prepare for a Front End
          Engineering interview. Join today for a 20% discount!
        </p>
        <a 
          href="https://www.greatfrontend.com/prepare?gnrs=grind75&utm_source=grind75&utm_medium=referral"
          className="promo-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>
      
      <div className="promo-card">
        <h3>Craft the Perfect Resume for FAANG</h3>
        <p>
          Grab FAANG-quality resume templates and examples now for a whopping 70% off!
        </p>
        <a 
          href="https://www.faangtechleads.com/?utm_source=grind75&utm_medium=referral&utm_content=sidebar"
          className="promo-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Templates
        </a>
      </div>
    </aside>
  );
};