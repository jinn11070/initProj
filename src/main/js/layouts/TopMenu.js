import React, { Component } from 'react';
import { CollapsibleNav, Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem,
	Grid, Row, Col, Modal, Button, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import BassInfoDialog from '../dialog/BassInfoDialog';
import * as ajax from '../ajax';
/**
 * Application top menu structure.
 *
 * +-TopMenu---------------+
 * | TopMenuNavbar         |
 * | LeftMenuNavbar        |
 * | footer                |
 * +-----------------------+
 *
 */

export default class TopMenu extends Component {
	render() {
		return (
			<div>
				<TopMenuNavbar route={this.props.route} />
				{this.props.children}
			</div>
		);
	}
}

/**
 * Top menu navbar.
 */
class TopMenuNavbar extends Component {

	constructor() {
		super();

		this.state = {
			bassInfo: [],
			showViewDialog: false
		};
	}
	/*componentDidMount() {
		ajax.list('/login/getBassInformation', (data) => {
			this.setState({
				bassInformation: data
			});
		})
	}*/
	render() {
		return (
			<div>
				<Navbar fixedTop>
					<Navbar.Header>
						<Navbar.Brand><a href="#">BASS</a></Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
                            {/*{
								this.props.route.childRoutes.map((item)=> {
									return (
										<LinkContainer key={item.name} to={this.props.route.path + '/' + item.path}>
											<NavItem>{item.name}</NavItem>
										</LinkContainer>
									);
								})
							}*/}
                            {
                                this.props.route.childRoutes.map((item)=> {
                                    return (
                                        <NavDropdown title={item.name} id="collapsible-nav-dropdown" to={item.path + item.indexRoute.to}>
                                            {
                                                item.childRoutes.map( (childItem)=> {
                                                    return (
                                                        <LinkContainer key={childItem.path} to={this.props.route.path + '/' + item.path + '/' + childItem.path}>
                                                            <NavItem>{childItem.name}</NavItem>
                                                        </LinkContainer>
                                                    );
                                                })
                                            }
                                        </NavDropdown>
                                    );
                                })
                            }
						</Nav>

						<Nav pullRight>
							<NavItem onClick={()=>this.setState({showViewDialog:true})}>info</NavItem>
                            <NavItem href="/bass/logout/index">logout</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<BassInfoDialog show={this.state.showViewDialog} close={()=>this.setState({showViewDialog:false})}/>
			</div>

		);
	}
}

