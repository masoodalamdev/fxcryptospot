import { Box, Grid, InputBase, Toolbar, useTheme } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import MuiCardFullView from '../../Components/MuiCardFullView/MuiCardFullView'
import privacypolicy from '../../Assets/Images/privacypolicy.jpg'
import { FcPrivacy , FcCancel} from 'react-icons/fc'
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import * as blogServices from '../../Services/blogServices'
import SearchIcon from '@mui/icons-material/Search';
import MuiCard from '../../Components/MuiCard/MuiCard'
import Notification from '../../Components/Notification/Notification'
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog'

// =================== back to top button started =========================

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// =================== back to top button ended =========================


export default function PrivacyPolicy(props) {
  const theme = useTheme()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const {searchBar} = props
  const [searchQuery, setSearchQuery] = useState({ "searchQuery": ""})
  const [searchedBlog, setSearchedBlog] = useState([])
  const [searchHeader, setSearchHeader] = useState({title: "Search something amazing", subTitle: "Learn crypto earn crypto", icon: true})

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
  }
  const handleSearch = async () => {
    await blogServices.getSearchBlogs(searchQuery)
      .then((response => {
        if(response.data.data.length > 0){
          setSearchedBlog(response.data.data)
          setSearchHeader({
            title: `You have searched for "${searchQuery.searchQuery}"`,
            subTitle: `${response.data.data.length} results found`,
            icon: true
          })
        }
      }))
      .catch((response) => {
        // console.log(error);
        setSearchedBlog(null)
        setSearchHeader({
          title: 'Your search did not match any results!',
          subTitle: 'Try to search some another keywords',
          icon: false
        })
      })
  }
  const currentUrl = window.location.href

  const handleFavorite = () => {
    alert('favorite added succesfully')
  }

  const handleDelete = (id) => {
    // console.log("event=>", event, "message=>", id)
    blogServices.deleteBlog(id)
      .then((response => {
        // console.log(response)
        const msg = response.data
        // console.log("Redirecting to blog portal..!")
        // setTimeout(() => { navigate('/blogs') }, 2000);
        setConfirmDialog({
          ...setConfirmDialog,
          isOpen: false
        })
        setNotify({
          isOpen: true,
          message: msg,
          type: 'success'
        })
      }))
      .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })

  }
  return (

    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:9, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
    <Toolbar/>
     
        <PageHeader
        icon={searchBar ? (searchHeader.icon === true ? <SearchIcon size={24} /> : <FcCancel size={24} />) : <FcPrivacy size={24} />}
        title={searchBar ? searchHeader.title : "Privacy Policy"}
        subTitle={searchBar ? searchHeader.subTitle : "Learn Crypto Earn Crypto"}
      />
      {searchBar ?
        <InputBase
        autoComplete='off'
          fullWidth
          sx={{ bgcolor: theme.palette.background.paper, mb: 4, height: '50px', p: 2, borderRadius: '1rem' }}
          placeholder='Search here'
          name="searchQuery" value={searchQuery.searchQuery}
          endAdornment={<SearchIcon fontSize="small" onClick={handleSearch} sx={{ cursor: 'pointer' }} />}
          onChange={handleSearchInput}
        />
        : ''
      }

<Grid container>
{
          searchBar ?
            searchedBlog && searchedBlog.map((item, index) => {

              return (
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }} >

                  <MuiCard
                    key={index}
                    image={item.image}
                    profileImage={item.author.authorImage}
                    title={item.title}
                    // date={item.publishDate.substring(0,10)}
                    category={item.category}
                    chipColor={item.category === 'Bitcoin' ? 'primary' : (item.category === 'CryptoCurrency') ? 'secondary' : (item.category === 'Blockchain') ? 'error' : (item.category === 'Ethereum') ? 'success' : (item.category === 'Blockchain') ? 'info' : (item.category === 'Mining') ? 'warning' : 'primary'}
                    createdAt={item.createdAt.substring(0, 10)}
                    // description={item.content}
                    id={item._id}
                    slug={item.slug}
                    shareUrl={currentUrl + '/' + item.slug}
                    authorID={item.author.authorID}
                    handleDelete={() => {
                      // handleDelete(item._id)
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { handleDelete(item._id) }
                      })
                    }}
                    // clickHandler={clickHandler}
                    handleFavorite={handleFavorite}
                  />
                </Grid>
              )

            })
            :

            <MuiCardFullView
            image={privacypolicy}
            profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
            title="Forex Crypto Spot"
            categoryAndDate="01-01-2018"
            description= "<h1>Privacy Policy for Forex Crypto Spot</h1> <p>At Forex Crypto Spot, accessible from https://www.forexcryptospot.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Forex Crypto Spot and how we use it.</p>
            
            <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
            
            <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Forex Crypto Spot. This policy is not applicable to any information collected offline or via channels other than this website.</p>
            
            <h2>Consent</h2>
            
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            
            <h2>Information we collect</h2>
            
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
            
            <h2>How we use your information</h2>
            
            <p>We use the information we collect in various ways, including to:</p>
            
            <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
            </ul>
            
            <h2>Log Files</h2>
            
            <p>Forex Crypto Spot follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
            
            
            <h2>Google DoubleClick DART Cookie</h2>
            
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL  <a href='https://policies.google.com/technologies/ads'>https://policies.google.com/technologies/ads</a></p>
            <h2>Our Advertising Partners</h2>
            
            <p>Some of advertisers on our site may use cookies and web beacons Our advertising partners are listed below Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
            
            <ul>
                <li>
                    <p>Google</p>
                    <p><a href='https://policies.google.com/technologies/ads'>https://policies.google.com/technologies/ads</a></p>
                </li>
            </ul>
            
            <h2>Advertising Partners Privacy Policies</h2>
            
            <P>You may consult this list to find the Privacy Policy for each of the advertising partners of Forex Crypto Spot.</p>
            
            <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Forex Crypto Spot, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
            
            <p>Note that Forex Crypto Spot has no access to or control over these cookies that are used by third-party advertisers.</p>
            
            <h2>Third Party Privacy Policies</h2>
            
            <p>Forex Crypto Spot's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
            
            <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
            
            <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            
            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
            <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
            <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            
            <h2>GDPR Data Protection Rights</h2>
            
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
            <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
            <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
            <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
            <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
            <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            
            <h2>Children's Information</h2>
            
            <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
            
            <p>Forex Crypto Spot does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            
            <h2>Changes to This Privacy Policy</h2>
            
            <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
            
            
            <h2>Contact Us</h2>
            
            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>"
           
            />
        }
        </Grid>
        <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
               <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
</Box>
  )
}
