--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: evententry; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.evententry (
    id integer NOT NULL,
    description text,
    start time without time zone,
    duration time without time zone,
    day date,
    tag integer,
    users integer
);


ALTER TABLE public.evententry OWNER TO "user";

--
-- Name: eventEntry_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

ALTER TABLE public.evententry ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventEntry_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tag; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name text,
    hexcolor text,
    parenttag bigint
);


ALTER TABLE public.tag OWNER TO "user";

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

ALTER TABLE public.tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    password text,
    role integer
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: evententry; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.evententry (id, description, start, duration, day, tag, users) FROM stdin;
1	VSA exercises	11:00:00	02:15:00	2025-07-26	8	1
2	VSA exercises	14:00:00	00:30:00	2025-07-26	8	1
3	mm with the boys	21:24:00	01:23:00	2025-07-26	6	1
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tag (id, name, hexcolor, parenttag) FROM stdin;
1	work	#4287f5	\N
2	fun	#ed0e16	\N
3	school	#079138	1
4	chores	#cbd911	1
5	gaming	#e66407	2
6	counter strike 2	#d620e3	5
7	brawlstars	#781021	5
8	VSA	#0be328	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, password, role) FROM stdin;
1	Patyko	mony	0
2	Adi	nagy mony	1
3	Flauri	kis mony	2
\.


--
-- Name: eventEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."eventEntry_id_seq"', 3, true);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.tag_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: evententry eventEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.evententry
    ADD CONSTRAINT "eventEntry_pkey" PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: tag parenttag FK; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "parenttag FK" FOREIGN KEY (parenttag) REFERENCES public.tag(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: evententry tag FK; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.evententry
    ADD CONSTRAINT "tag FK" FOREIGN KEY (tag) REFERENCES public.tag(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: evententry user FK; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.evententry
    ADD CONSTRAINT "user FK" FOREIGN KEY (users) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

