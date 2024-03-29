// Imports
import React, {useContext, useState} from 'react';
import {Button, Container, Dropdown, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import ThemeContext from "../Context/ThemeContext.jsx";
import { useTranslation } from 'react-i18next';

// CSS
import '../Styles/MyNavbar.css';

// Code
function MyNavbar (props) {

    const { t, i18n } = useTranslation();
    const languages = [
        {name: 'polski', value: 'pl'},
        {name: 'angielski', value: 'en'},
        {name: 'niemiecki', value: 'de'},
    ]

    const {theme, setTheme} = useContext(ThemeContext);
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        let value = event.target.value
        value = value.replace(/\s+/g, '_').toLowerCase();
        setSearch(value);
    }

    const handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            window.location.href = `/search/${search}`;
        }
    }

    function searchData() {
        window.location.href = `/search/${search}`;
    }

	const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    let theme_icon = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';

    return (
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className=" navbarScroll">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Hyped.pl</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <LinkContainer to="/Films">
                                <Nav.Link>{t("filmy")}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Serials">
                                <Nav.Link>{t("seriale")}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder={t("fraza")} className="MyNavbar_Input me-2" aria-label="Search" onChange={handleSearch} />
                            <Button variant="outline-warning" onClick={searchData} onSubmit={setSearch} onKeyDown={handleKeyPress}>{t("wyszukaj")}</Button>
                        </Form>
                        {!props.token && props.token !== "" && props.token !== "undefined"?
                            <Nav>
                                <LinkContainer to="/login">
                                    <Nav.Link className="ps-4">{t("zaloguj")}</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            :(
                            <Nav>
                                <LinkContainer to="/account">
                                    <Nav.Link className="ps-4">{t("profil")}</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            )}
                        <Nav>
                            <Container>
                                <Nav.Link onClick={changeTheme} className="ps-4">
                                    <span className={theme_icon}></span>
                                </Nav.Link>
                            </Container>
                            <Container>
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        <span className="fa fa-language"></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark">
                                        {languages.map(language => (
                                            <Dropdown.Item key={language.value} onClick={() => i18n.changeLanguage(language.value)}>{t(language.name)}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Container>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
  );
}

export default MyNavbar;