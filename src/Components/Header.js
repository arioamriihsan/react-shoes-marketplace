import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
	Collapse,
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
} from 'reactstrap';

// redux hooks
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../Redux/Action'

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const gState = useSelector(({ auth }) => {
		return {
			logged: auth.logged,
			username: auth.username,
			role: auth.role
		}
	})
	// console.log(gState)
	const dispatch = useDispatch()
	const logout = () => {
		dispatch(Logout())
		localStorage.removeItem('token')
	}

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand tag={Link} to='/'>Shoesilo</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="#">Men</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Women</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Kids</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								<FontAwesomeIcon icon={faUser} />
							</DropdownToggle>
							{
							gState.logged
								?
								<DropdownMenu left='true'>
									<Link to='/my-cart'>
										<DropdownItem>Cart</DropdownItem>
									</Link>
									<Link to='/transaction'>
										<DropdownItem>Transaction</DropdownItem>
									</Link>
									<Link to='/profile'>
										<DropdownItem>Profile</DropdownItem>
									</Link>
									{
										gState.role === 'admin'
										?
										<Link to='/manage-products'>
											<DropdownItem>Manage Products</DropdownItem>
										</Link>
										:
										null
									}
									<Link to='/'>
										<DropdownItem onClick={logout}>Logout</DropdownItem>
									</Link>
								</DropdownMenu>
								:
								<DropdownMenu left='true'>
									<Link to='/login'>
										<DropdownItem>Login</DropdownItem>
									</Link>
									<Link to='/register'>
										<DropdownItem>Register</DropdownItem>
									</Link>
								</DropdownMenu>
							}
						</UncontrolledDropdown>
					</Nav>
					<NavbarText>Best Shoes</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header;