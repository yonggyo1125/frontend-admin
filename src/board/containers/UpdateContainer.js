'use client';
import React, { useLayoutEffect} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const UpdateContainer = () => {
    const { setMenuCode, setSubMenuCode } = getCommonActions();
    useLayoutEffect(() => {
        setMenuCode("board");
        setSubMenuCode("register");
    }, [setSubMenuCode, setMenuCode]);
    
    return <h1>게시판 등록/수정</h1>
};

export default React.memo(UpdateContainer);