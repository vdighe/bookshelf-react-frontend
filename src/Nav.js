import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
    state = {
        expanded: false,
        activeItem: 'home'
    }
    toggle = () => {
        this.setState(prevState => ({ expanded: !prevState.expanded }))
    };

    close = () => {
        this.setState({ expanded: false });
    };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        const {
            router,
            isAuthenticated,
            fullName,
        } = this.props;
        console.log(this.props);
        return (
            <div>

            <Menu className="nav-bar">
                <Menu >
                    <Menu.Item
                        as={NavLink} to="/home"
                        icon='home'
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    {isAuthenticated && (
                        <Menu.Item
                            as={NavLink} to="/mybooks"
                            name='My Books'
                            active={activeItem === 'mybooks'}
                            onClick={this.handleItemClick}
                        />
                    )}

                    {isAuthenticated && (
                        <Menu.Item
                            as={NavLink} to="/addbooks"
                            name='Add Books'
                            active={activeItem === 'addbooks'}
                            onClick={this.handleItemClick}

                        />
                    )}
                </Menu>
                <Menu.Menu position="right">
                    {isAuthenticated ? (
                        <Menu.Item 
                            href={`${process.env.PUBLIC_URL}/logout`}
                            icon='Sign-out'
                            onSelect={this.close}
                            onClick={this.handleItemClick}
                        >
                            Logout
                    </Menu.Item>) : (
                            <Menu.Item
                                as={NavLink} to="/login"
                                icon='sign-in'
                                name='Login'
                                active={activeItem === 'login'}
                                onSelect={this.close}
                                onClick={this.handleItemClick}
                            />
                        )}
                        <Menu.Item
                            as={NavLink} to="/register"
                            name='Register'
                            active={activeItem === 'register'}
                            onSelect={this.close}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu >

            </Menu>


            </div>

        )
    }
}
