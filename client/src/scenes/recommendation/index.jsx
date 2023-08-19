import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetRandomuserItemsQuery } from 'state/recommendapi';

import Header from 'components/Header';
import CustomGrid from 'components/CustomGrid';

const Recommendations = () => {
	const theme = useTheme();

	// values to be sent to the backend
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(20);
	const [sort, setSort] = useState({});
	const [search, setSearch] = useState('');

	const [searchInput, setSearchInput] = useState('');

	const { data, isLoading } = useGetRandomuserItemsQuery();
	// const data = [
	// 	{
	// 		id: 50,
	// 		item: [200, 400],
	// 	},
	// ];

	const columns = [
		{
			field: '_id',
			headerName: 'User ID',
			flex: 1,
			valueGetter: (params) => params.row.user_id,
		},
		{
			field: 'item',
			headerName: 'List of Recommended Item IDs ',
			flex: 1,
			valueGetter: (params) => params.row.item_list.join(', '),
		},
	];

	return (
		<Box m='1.5rem 2.5rem'>
			<Header
				title='User Recommendations'
				subtitle='Entire list of Recommended Items'
			/>
			<Box
				height='80vh'
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: theme.palette.primary.light,
					},
					'& .MuiDataGrid-footerContainer': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: 'none',
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					getRowId={(row) => row.user_id}
					rows={data || []}
					columns={columns}
					onSortModelChange={(newSortModel) => setSort(...newSortModel)}
					components={{ Toolbar: CustomGrid }}
				/>
			</Box>
		</Box>
	);
};

export default Recommendations;
