import {
	GridToolbarDensitySelector,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from 'components/FlexBetween';

const CustomGrid = () => {
	return (
		<GridToolbarContainer>
			<FlexBetween width='100%'>
				<FlexBetween>
					<GridToolbarColumnsButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</FlexBetween>
			</FlexBetween>
		</GridToolbarContainer>
	);
};

export default CustomGrid;
