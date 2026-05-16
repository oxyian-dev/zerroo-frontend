import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
});

const Loader = () => (
    <LoaderWrapper>
        <LinearProgress
            value={100}
            sx={{
                backgroundColor: 'rgba(239,203,119,.2)',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#efcb77'
                }
            }}
        />
    </LoaderWrapper>
);

export default Loader;
