import React from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	let isHome = window.location.href.includes('home')
	let isProfile = window.location.href.includes('profile')
	if (!isLoaded) return <></>

	return (
		<div id="nav-bar-background">
			<span id='logo'
				onClick={() => {
					sessionUser ? history.push('/home') : history.push('/')
				}}
			>
				Linked
				<span className='nav-bar-logo'>Up</span>
			</span>

			<ul id="nav-bar">
				<li className='nav-bar-list' >
					<NavLink exact to="/home" activeStyle={isHome ? { color: "black", borderBottom: "2pt solid black" } : {}}>
						<>
							<i className="fa-solid fa-house fa-lg"></i>
							<span className='list-option-text'>Home</span>
						</>

					</NavLink>
				</li>

				{isLoaded && sessionUser && (
					<>

						<li className='nav-bar-list'>
							<NavLink exact to={`/profile/${sessionUser.id}`} activeStyle={isProfile ? { color: "black", borderBottom: "2pt solid black" } : {}} >

								<>
									<i class="fa-solid fa-user fa-xl"></i>
									<span className='list-option-text'>Profile</span>
								</>

							</NavLink>
						</li>
						<li className='options-list'>
							<ProfileButton user={sessionUser} />
						</li>
					</>
				)}

			</ul>
		</div >
	);
}

export default Navigation;
