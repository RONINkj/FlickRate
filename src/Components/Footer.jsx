import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <div className='footer_outer_container bg-black text-gray-400'>
      <div className='footer_inner_container flex justify-between items-center mx-auto py-4 px-6'>
        <div className='footer_icons'>
          <FacebookOutlinedIcon className='text-white mr-2' />
          <InstagramIcon className='text-white mr-2' />
          <YouTubeIcon className='text-white' />
        </div>
        <div className='footer_data flex justify-between w-3/5'>
          <div>
            <ul>
              <li className='cursor-pointer'>Audio Description</li>
              <li className='cursor-pointer'>Investor Relations</li>
              <li className='cursor-pointer'>Legal Notice</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='cursor-pointer'>Help Center</li>
              <li className='cursor-pointer'>Jobs</li>
              <li className='cursor-pointer'>Cookie Preferences</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='cursor-pointer'>Gift Cards</li>
              <li className='cursor-pointer'>Terms of Use</li>
              <li className='cursor-pointer'>Corporate Information</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='cursor-pointer'>Media Center</li>
              <li className='cursor-pointer'>Privacy</li>
              <li className='cursor-pointer'>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className='service_code border border-white px-4 py-2 cursor-pointer'>
          <p className='text-white'>Service Code</p>
        </div>
      </div>
      <div className='copy-write text-center text-sm'>
        &copy; 2024, Inc.
      </div>
    </div>
  );
}

export default Footer;
