import { Link } from 'react-router-dom'

export default function Adminpanelcomponent() {
// start - shezi
  const handleLogout = () => {
    // Clear tokens from session storage
    sessionStorage.clear();
    alert ("logout successfully")
    window.location.href = "/admin";
  };

  //end - shezi

  return (
    <div className='adminpanel-container'>
      <Link to={'/admin/addinstitute'}>
        <button>
          Add Insititute
        </button>
      </Link>
      <Link to={'/admin/addprogram'}>
        <button>
          Add Program
        </button>
      </Link>
      <Link to={'/admin/editinstitute'}>
        <button>
          Edit Insititute Details
        </button>
      </Link>
      <button style={{position:"absolute", top:"45px", right:"10px", width:"200px"}} onClick={handleLogout}> log out </button>
    </div>
    
  )
}