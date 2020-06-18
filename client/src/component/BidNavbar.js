import React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import {Icon} from "react-icons-kit";
import {hammer2} from 'react-icons-kit/icomoon/hammer2';
import {upload} from 'react-icons-kit/icomoon/upload'
import "../css/style.css";
import "../css/IG_style.css";

class BidNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className='navbar_div'>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand href='/home'>Home</NavbarBrand>
            <NavbarBrand href='/auction'>Auction</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mr-auto' navbar>
              </Nav>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='/bidding'>
                    <Icon icon={hammer2} size={23}/>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/upload'>
                    <Icon icon={upload} size={23}/>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default BidNavbar;
