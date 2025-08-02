import { Avatar, Box, Button, ButtonBase, Card, CardContent, Divider, Fade, Grid, Link as Href, IconButton, Stack, TextField, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import config from "../config";
import fetcher from '../utils/fetcher';
import { formatName, inr, toImage } from '../utils/util';

const construct = genealogy => {
    let data = {};
    data.a = sanitize(genealogy[genealogy.id], null, genealogy.id);

    data.b = sanitize(genealogy[data.a.left_id], "left", data.a.id);
    data.c = sanitize(genealogy[data.a.right_id], "right", data.a.id);

    if (data.b && !data.b.add) {
        data.d = sanitize(genealogy[data.b.left_id], "left", data.b.id);
        data.e = sanitize(genealogy[data.b.right_id], "right", data.b.id);
        if (data.d && !data.d.add) {
            data.h = sanitize(genealogy[data.d.left_id], "left", data.d.id);
            data.i = sanitize(genealogy[data.d.right_id], "right", data.d.id);
        }
        if (data.e && !data.e.add) {
            data.j = sanitize(genealogy[data.e.left_id], "left", data.e.id);
            data.k = sanitize(genealogy[data.e.right_id], "right", data.e.id);
        }
    }

    if (data.c && !data.c.add) {
        data.f = sanitize(genealogy[data.c.left_id], "left", data.c.id);
        data.g = sanitize(genealogy[data.c.right_id], "right", data.c.id);
        if (data.f && !data.f.add) {
            data.l = sanitize(genealogy[data.f.left_id], "left", data.f.id);
            data.m = sanitize(genealogy[data.f.right_id], "right", data.f.id);
        }
        if (data.g && !data.g.add) {
            data.n = sanitize(genealogy[data.g.left_id], "left", data.g.id);
            data.o = sanitize(genealogy[data.g.right_id], "right", data.g.id);
        }
    }

    return data;
}

const sanitize = (data, position, id) => {
    if (data === undefined) {
        return { position, id, add: true };
    } else if (data === null) {
        return null;
    } else {
        return { ...data, ...{ exists: true } };
    }
}

const GenealogyAvatar = ({ data }) => {

    const [show, setShow] = useState(false)
    const stringToColor = string => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const stringAvatar = name => name ? `${name.split(' ')[0][0]}${name.split(' ')?.[1]?.[0] || ''}` : ''
    const name = data?.exists && formatName(data)
    const sx = useMemo(() => (
        data?.exists ? {
            width: {
                md: 80,
                xs: 70
            },
            height: {
                md: 80,
                xs: 70
            },
            border: {
                md: "6px solid #afb3b7",
                xs: "3px solid #afb3b7"
            },
            ":hover": {
                border: {
                    md: "6px solid #ffb99d",
                    xs: "3px solid #ffb99d",
                }
            },
            cursor: data?.level === 3 ? "pointer" : "inherit",
            bgcolor: stringToColor(data.username),
            color: stringToColor(data.firstname),
            display: "inline-flex",
            textDecoration: "none"
        } : null), [data])

    return (
        data ? data?.exists ? (
            <Box>
                <Box textAlign="center">
                    <Stack direction="row" justifyContent="center">
                        {data.level !== 3 && (
                            <Fade in={show}>
                                <Box alignSelf="center" textAlign="right" mr={1} width={{ md: 100, xs: 70 }}>
                                    <Typography>Balance: {inr(data.carry_left_pv)}</Typography>
                                    <Typography>Total: {inr(data.total_left_pv)}</Typography>
                                </Box>
                            </Fade>
                        )}
                        <Box mb={1}>
                            {data.level !== 0 ? (
                                <ButtonBase sx={{ borderRadius: '50%' }} component={Link} to={`/dashboard/genealogy/${data.username}`}>
                                    <Avatar
                                        alt=""
                                        sx={sx}
                                        src={data.avatar ? toImage(data.avatar) : null}
                                        onMouseOver={() => { setShow(true) }}
                                        onMouseOut={() => { setShow(false) }}

                                    >{stringAvatar(name)}</Avatar>
                                </ButtonBase>
                            ) : (
                                <Avatar
                                    alt=""
                                    sx={sx}
                                    src={data.avatar ? toImage(data.avatar) : null}
                                    onMouseOver={() => { setShow(true) }}
                                    onMouseOut={() => { setShow(false) }}
                                >{stringAvatar(name)}</Avatar>
                            )}
                        </Box>
                        {data.level !== 3 && (
                            <Fade in={show}>
                                <Box alignSelf="center" textAlign="left" ml={1} width={{ md: 100, xs: 70 }}>
                                    <Typography>Balance: {inr(data.carry_right_pv)}</Typography>
                                    <Typography>Total: {inr(data.total_right_pv)}</Typography>
                                </Box>
                            </Fade>
                        )}
                    </Stack>
                </Box>
                <Box textAlign="center">
                    <Typography>{name}</Typography>
                    <Href href={`tel:+91${data.phone}`}>{data.phone}</Href>
                    <Typography>{data.username}</Typography>
                    <Typography>{config.pvName}: {data.self_pv}</Typography>
                </Box>
                {data.level !== 3 && (
                    <Divider
                        variant="middle"
                        sx={{
                            borderColor: 'rgba(0, 0, 0, 0.25)',
                            my: 1,
                            width: '50%',
                            mx: 'auto'
                        }} />
                )}
            </Box>
        ) : (
            <AddButton username={data.id} position={data.position} />
        ) : null
    )
}

const AddButton = ({ username, position }) => (
    <Box textAlign="center" mt={{ md: 3 / 2, xs: 1 / 2 }}>
        <IconButton component={Link} to={`/dashboard/add-distributor/${username}/${position}`}>
            <IconPlus size={48} />
        </IconButton>
    </Box>
)

export default function Genealogy() {
    const { id } = useParams()
    const [genealogy, setGenealogy] = useState({})
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    useEffect(() => {
        const params = new URLSearchParams()
        if (id) { params.set('username', id) }
        fetcher(`/api/distributors/genealogy?${params}`)
            .then(r => r.json())
            .then(({ genealogy, status, message }) => {
                if (status === 'success') {
                    setGenealogy(construct(genealogy))
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
                    navigate('/dashboard/genealogy')
                }
                setSearch(id ? id : '')
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Box>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h2" textAlign="center">Genealogy</Typography>
                </CardContent>
            </Card>
            <TextField
                fullWidth
                id="name"
                type="text"
                value={search}
                onChange={({ target }) => {
                    let { value } = target
                    setSearch(value)
                }}
                name="username"
                label="ZID"
                InputProps={{
                    endAdornment: (
                        <Button onClick={() => {
                            navigate(`/dashboard/genealogy/${search}`)
                        }}>
                            Load
                        </Button>)
                }}
                sx={{ mb: 2 }}
            />
            <Box overflow="auto">
                <Grid container minWidth={{ md: 1200, xs: 950 }}>
                    <Grid item xs={12}>
                        <GenealogyAvatar data={genealogy.a} />
                        <Grid container>
                            <Grid item xs={6}>
                                <GenealogyAvatar data={genealogy.b} />
                                <Grid container>
                                    <Grid item xs={6}>
                                        <GenealogyAvatar data={genealogy.d} />
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.h} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.i} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <GenealogyAvatar data={genealogy.e} />
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.j} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.k} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <GenealogyAvatar data={genealogy.c} />
                                <Grid container>
                                    <Grid item xs={6}>
                                        <GenealogyAvatar data={genealogy.f} />
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.l} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.m} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <GenealogyAvatar data={genealogy.g} />
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.n} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <GenealogyAvatar data={genealogy.o} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
