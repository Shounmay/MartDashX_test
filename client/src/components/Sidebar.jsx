import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpeg';

import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';

import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
} from '@mui/icons-material';

const navItems = [
	{
		text: 'UserRecommendations',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Dashboard',
		icon: <HomeOutlined />,
	},
	{ text: 'Client facing', icon: null },
	{ text: 'Products', icon: <ShoppingCartOutlined /> },
	{ text: 'Customers', icon: <Groups2Outlined /> },
	{ text: 'Transactions', icon: <ReceiptLongOutlined /> },
	{ text: 'DiversityStats', icon: <PublicOutlined /> },
	{ text: 'Sales', icon: null },
	{ text: 'Overview', icon: <PointOfSaleOutlined /> },
	{ text: 'Daily', icon: <TodayOutlined /> },
	{ text: 'Monthly', icon: <CalendarMonthOutlined /> },
	{ text: 'Breakdown', icon: <PieChartOutlined /> },
	{ text: 'Manegement', icon: null },
	{ text: 'Admin', icon: <AdminPanelSettingsOutlined /> },
	{ text: 'Performance', icon: <TrendingUpOutlined /> },
];
const Sidebar = ({
	user,
	drawerWidth,
	isSidebarOpen,
	updateSidebar,
	closeSidebar,
	isNonMobile,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const handleSidebarToggle = () => {
		updateSidebar();
	};

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);
	return (
		<Box component='nav'>
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => closeSidebar()}
					variant='persistent'
					anchor='left'
					sx={{
						width: drawerWidth,
						'&.MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							boxSizing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width='100%'>
						<Box m='1.5rem 2rem 2rem 3rem'>
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display='flex' alignItems='center' gap='0.5rem'>
									<Typography variant='h4' fontWeight='bold'>
										MartDashX
									</Typography>
								</Box>
								{!isNonMobile && (
									<IconButton onClick={handleSidebarToggle}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
											{text}
										</Typography>
									);
								}
								const lctext = text.toLowerCase();

								return (
									<ListItem key={text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${lctext}`);
												setActive(lctext);
											}}
											sx={{
												backgroundColor:
													active === lctext
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === lctext
														? theme.palette.secondary[60]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === lctext
															? theme.palette.secondary[60]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lctext && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box>
						<Divider />
						<FlexBetween
							textTransform='none'
							gap='0.5rem'
							m='1.5rem 2rem 0 3rem'
						>
							<Box
								component='img'
								alt='profile'
								src={profileImage}
								height='40px'
								width='40px'
								borderRadius='50%'
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign='left'>
								<Typography
									fontWeight='bold'
									fontSize='0.9rem'
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize='0.8rem'
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
