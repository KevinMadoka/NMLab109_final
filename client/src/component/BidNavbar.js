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
      <div>
        <Navbar color="dark" dark expand='sm'>
          <Container >
            <NavbarBrand className='mr-2' href='/home'>Home</NavbarBrand>
            <NavbarBrand href='/auction'>Auction</NavbarBrand>
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
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default BidNavbar;
