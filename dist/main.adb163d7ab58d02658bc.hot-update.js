"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatetest_task"]("main",{

/***/ "./src/pages/PostPage.tsx":
/*!********************************!*\
  !*** ./src/pages/PostPage.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PostPage\": () => (/* binding */ PostPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _components_NavBtnsOfPage_NavBtnsOfPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/NavBtnsOfPage/NavBtnsOfPage */ \"./src/components/NavBtnsOfPage/NavBtnsOfPage.tsx\");\n/* harmony import */ var _components_TitleOfPage_TitleOfPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TitleOfPage/TitleOfPage */ \"./src/components/TitleOfPage/TitleOfPage.tsx\");\n/* harmony import */ var _components_CardOfComment_CardOfComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CardOfComment/CardOfComment */ \"./src/components/CardOfComment/CardOfComment.tsx\");\n/* harmony import */ var _components_ThreeDotsSpinner_ThreeDotsSpinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ThreeDotsSpinner/ThreeDotsSpinner */ \"./src/components/ThreeDotsSpinner/ThreeDotsSpinner.tsx\");\n/* harmony import */ var _components_BackgroundGlass_BackgroundGlass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/BackgroundGlass/BackgroundGlass */ \"./src/components/BackgroundGlass/BackgroundGlass.tsx\");\n/* harmony import */ var _store_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store/hooks */ \"./src/store/hooks.ts\");\n/* harmony import */ var _store_slices_Posts_dataPostsSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/slices/Posts/dataPostsSlice */ \"./src/store/slices/Posts/dataPostsSlice.ts\");\n/* harmony import */ var _store_slices_Comments_customSelectorsOfComments__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store/slices/Comments/customSelectorsOfComments */ \"./src/store/slices/Comments/customSelectorsOfComments.ts\");\n/* harmony import */ var _store_slices_Comments_dataCommentsSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../store/slices/Comments/dataCommentsSlice */ \"./src/store/slices/Comments/dataCommentsSlice.ts\");\n/* harmony import */ var _store_slices_Comments_fetchGetComments__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../store/slices/Comments/fetchGetComments */ \"./src/store/slices/Comments/fetchGetComments.ts\");\n/* harmony import */ var _store_slices_Posts_fetchPosts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../store/slices/Posts/fetchPosts */ \"./src/store/slices/Posts/fetchPosts.ts\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/constants */ \"./src/utils/constants.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst PostPage = () => {\n    const dispatch = (0,_store_hooks__WEBPACK_IMPORTED_MODULE_7__.useAppDispatch)();\n    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();\n    const { postId } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useParams)();\n    const post = (0,_store_hooks__WEBPACK_IMPORTED_MODULE_7__.useAppSelector)((store) => _store_slices_Posts_dataPostsSlice__WEBPACK_IMPORTED_MODULE_8__.selectorsPosts.selectById(store, Number(postId)));\n    const comments = (0,_store_hooks__WEBPACK_IMPORTED_MODULE_7__.useAppSelector)((store) => (0,_store_slices_Comments_customSelectorsOfComments__WEBPACK_IMPORTED_MODULE_9__.selectCommentsByPostId)(store, Number(postId)));\n    const { statusOfLoading: statusOfPostLoading } = (0,_store_hooks__WEBPACK_IMPORTED_MODULE_7__.useAppSelector)((store) => store.dataPosts);\n    const { statusOfLoading: statusOfCommentsLoading, postIdsOfLoadedComments } = (0,_store_hooks__WEBPACK_IMPORTED_MODULE_7__.useAppSelector)((store) => store.dataComments);\n    const moveToNewPagePageHandler = (path) => () => {\n        dispatch(_store_slices_Posts_dataPostsSlice__WEBPACK_IMPORTED_MODULE_8__.actionsPosts.setActivePostId({ id: null }));\n        navigate(path);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n        if (!postId || postIdsOfLoadedComments.includes(Number(postId)))\n            return;\n        if (!post)\n            dispatch((0,_store_slices_Posts_fetchPosts__WEBPACK_IMPORTED_MODULE_12__.fetchPosts)({ method: 'get', postId }));\n        dispatch((0,_store_slices_Comments_fetchGetComments__WEBPACK_IMPORTED_MODULE_11__.fetchGetComments)(postId));\n        dispatch(_store_slices_Comments_dataCommentsSlice__WEBPACK_IMPORTED_MODULE_10__.actionsComments.addPostId({ id: Number(postId) }));\n    }, []);\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", Object.assign({ className: \"contianer-page\" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_NavBtnsOfPage_NavBtnsOfPage__WEBPACK_IMPORTED_MODULE_2__.NavBtnsOfPage, { btns: _utils_constants__WEBPACK_IMPORTED_MODULE_13__.dataOfNavBtns.postPage, onClickHandler: moveToNewPagePageHandler }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_TitleOfPage_TitleOfPage__WEBPACK_IMPORTED_MODULE_3__.TitleOfPage, { title: \"\\u041F\\u043E\\u0441\\u0442\" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", Object.assign({ className: \"position-relative p-3 border rounded\" }, { children: [statusOfPostLoading === _utils_constants__WEBPACK_IMPORTED_MODULE_13__.LoadingStatuses.pending && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ThreeDotsSpinner_ThreeDotsSpinner__WEBPACK_IMPORTED_MODULE_5__.ThreeDotsSpinner, {}), statusOfPostLoading === _utils_constants__WEBPACK_IMPORTED_MODULE_13__.LoadingStatuses.fulfilled && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"p\", Object.assign({ className: \"h3\" }, { children: post === null || post === void 0 ? void 0 : post.title }))\n                                ,\n                                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"p\", { children: post === null || post === void 0 ? void 0 : post.body })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_BackgroundGlass_BackgroundGlass__WEBPACK_IMPORTED_MODULE_6__.BackgroundGlass, {})] })), \")\", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", Object.assign({ className: \"d-flex flex-column\" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_TitleOfPage_TitleOfPage__WEBPACK_IMPORTED_MODULE_3__.TitleOfPage, { title: \"\\u041A\\u043E\\u043C\\u043C\\u0435\\u043D\\u0442\\u0430\\u0440\\u0438\\u0438\" }), statusOfCommentsLoading === _utils_constants__WEBPACK_IMPORTED_MODULE_13__.LoadingStatuses.pending && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ThreeDotsSpinner_ThreeDotsSpinner__WEBPACK_IMPORTED_MODULE_5__.ThreeDotsSpinner, {}), statusOfCommentsLoading === _utils_constants__WEBPACK_IMPORTED_MODULE_13__.LoadingStatuses.fulfilled &&\n                                comments.map((comment) => {\n                                    if (!comment)\n                                        return null;\n                                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CardOfComment_CardOfComment__WEBPACK_IMPORTED_MODULE_4__.CardOfComment, { comment: comment }, comment.id);\n                                })] }))] })] })));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvUG9zdFBhZ2UudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QtdGFzay8uL3NyYy9wYWdlcy9Qb3N0UGFnZS50c3g/Y2Y5MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUsIHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgTmF2QnRuc09mUGFnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2QnRuc09mUGFnZS9OYXZCdG5zT2ZQYWdlJztcbmltcG9ydCB7IFRpdGxlT2ZQYWdlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9UaXRsZU9mUGFnZS9UaXRsZU9mUGFnZSc7XG5pbXBvcnQgeyBDYXJkT2ZDb21tZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9DYXJkT2ZDb21tZW50L0NhcmRPZkNvbW1lbnQnO1xuaW1wb3J0IHsgVGhyZWVEb3RzU3Bpbm5lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvVGhyZWVEb3RzU3Bpbm5lci9UaHJlZURvdHNTcGlubmVyJztcbmltcG9ydCB7IEJhY2tncm91bmRHbGFzcyB9IGZyb20gJy4uL2NvbXBvbmVudHMvQmFja2dyb3VuZEdsYXNzL0JhY2tncm91bmRHbGFzcyc7XG5pbXBvcnQgeyB1c2VBcHBEaXNwYXRjaCwgdXNlQXBwU2VsZWN0b3IgfSBmcm9tICcuLi9zdG9yZS9ob29rcyc7XG5pbXBvcnQgeyBhY3Rpb25zUG9zdHMsIHNlbGVjdG9yc1Bvc3RzIH0gZnJvbSAnLi4vc3RvcmUvc2xpY2VzL1Bvc3RzL2RhdGFQb3N0c1NsaWNlJztcbmltcG9ydCB7IHNlbGVjdENvbW1lbnRzQnlQb3N0SWQgfSBmcm9tICcuLi9zdG9yZS9zbGljZXMvQ29tbWVudHMvY3VzdG9tU2VsZWN0b3JzT2ZDb21tZW50cyc7XG5pbXBvcnQgeyBhY3Rpb25zQ29tbWVudHMgfSBmcm9tICcuLi9zdG9yZS9zbGljZXMvQ29tbWVudHMvZGF0YUNvbW1lbnRzU2xpY2UnO1xuaW1wb3J0IHsgZmV0Y2hHZXRDb21tZW50cyB9IGZyb20gJy4uL3N0b3JlL3NsaWNlcy9Db21tZW50cy9mZXRjaEdldENvbW1lbnRzJztcbmltcG9ydCB7IGZldGNoUG9zdHMgfSBmcm9tICcuLi9zdG9yZS9zbGljZXMvUG9zdHMvZmV0Y2hQb3N0cyc7XG5pbXBvcnQgeyBkYXRhT2ZOYXZCdG5zLCBMb2FkaW5nU3RhdHVzZXMgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuZXhwb3J0IGNvbnN0IFBvc3RQYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlQXBwRGlzcGF0Y2goKTtcbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gICAgY29uc3QgeyBwb3N0SWQgfSA9IHVzZVBhcmFtcygpO1xuICAgIGNvbnN0IHBvc3QgPSB1c2VBcHBTZWxlY3Rvcigoc3RvcmUpID0+IHNlbGVjdG9yc1Bvc3RzLnNlbGVjdEJ5SWQoc3RvcmUsIE51bWJlcihwb3N0SWQpKSk7XG4gICAgY29uc3QgY29tbWVudHMgPSB1c2VBcHBTZWxlY3Rvcigoc3RvcmUpID0+IHNlbGVjdENvbW1lbnRzQnlQb3N0SWQoc3RvcmUsIE51bWJlcihwb3N0SWQpKSk7XG4gICAgY29uc3QgeyBzdGF0dXNPZkxvYWRpbmc6IHN0YXR1c09mUG9zdExvYWRpbmcgfSA9IHVzZUFwcFNlbGVjdG9yKChzdG9yZSkgPT4gc3RvcmUuZGF0YVBvc3RzKTtcbiAgICBjb25zdCB7IHN0YXR1c09mTG9hZGluZzogc3RhdHVzT2ZDb21tZW50c0xvYWRpbmcsIHBvc3RJZHNPZkxvYWRlZENvbW1lbnRzIH0gPSB1c2VBcHBTZWxlY3Rvcigoc3RvcmUpID0+IHN0b3JlLmRhdGFDb21tZW50cyk7XG4gICAgY29uc3QgbW92ZVRvTmV3UGFnZVBhZ2VIYW5kbGVyID0gKHBhdGgpID0+ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goYWN0aW9uc1Bvc3RzLnNldEFjdGl2ZVBvc3RJZCh7IGlkOiBudWxsIH0pKTtcbiAgICAgICAgbmF2aWdhdGUocGF0aCk7XG4gICAgfTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoIXBvc3RJZCB8fCBwb3N0SWRzT2ZMb2FkZWRDb21tZW50cy5pbmNsdWRlcyhOdW1iZXIocG9zdElkKSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghcG9zdClcbiAgICAgICAgICAgIGRpc3BhdGNoKGZldGNoUG9zdHMoeyBtZXRob2Q6ICdnZXQnLCBwb3N0SWQgfSkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaEdldENvbW1lbnRzKHBvc3RJZCkpO1xuICAgICAgICBkaXNwYXRjaChhY3Rpb25zQ29tbWVudHMuYWRkUG9zdElkKHsgaWQ6IE51bWJlcihwb3N0SWQpIH0pKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCBPYmplY3QuYXNzaWduKHsgY2xhc3NOYW1lOiBcImNvbnRpYW5lci1wYWdlXCIgfSwgeyBjaGlsZHJlbjogW19qc3goTmF2QnRuc09mUGFnZSwgeyBidG5zOiBkYXRhT2ZOYXZCdG5zLnBvc3RQYWdlLCBvbkNsaWNrSGFuZGxlcjogbW92ZVRvTmV3UGFnZVBhZ2VIYW5kbGVyIH0pLCBfanN4KFRpdGxlT2ZQYWdlLCB7IHRpdGxlOiBcIlxcdTA0MUZcXHUwNDNFXFx1MDQ0MVxcdTA0NDJcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6IFwicG9zaXRpb24tcmVsYXRpdmUgcC0zIGJvcmRlciByb3VuZGVkXCIgfSwgeyBjaGlsZHJlbjogW3N0YXR1c09mUG9zdExvYWRpbmcgPT09IExvYWRpbmdTdGF0dXNlcy5wZW5kaW5nICYmIF9qc3goVGhyZWVEb3RzU3Bpbm5lciwge30pLCBzdGF0dXNPZlBvc3RMb2FkaW5nID09PSBMb2FkaW5nU3RhdHVzZXMuZnVsZmlsbGVkICYmIChfanN4KFwicFwiLCBPYmplY3QuYXNzaWduKHsgY2xhc3NOYW1lOiBcImgzXCIgfSwgeyBjaGlsZHJlbjogcG9zdCA9PT0gbnVsbCB8fCBwb3N0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3N0LnRpdGxlIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfanN4KFwicFwiLCB7IGNoaWxkcmVuOiBwb3N0ID09PSBudWxsIHx8IHBvc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvc3QuYm9keSB9KSksIF9qc3goQmFja2dyb3VuZEdsYXNzLCB7fSldIH0pKSwgXCIpXCIsIF9qc3hzKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6IFwiZC1mbGV4IGZsZXgtY29sdW1uXCIgfSwgeyBjaGlsZHJlbjogW19qc3goVGl0bGVPZlBhZ2UsIHsgdGl0bGU6IFwiXFx1MDQxQVxcdTA0M0VcXHUwNDNDXFx1MDQzQ1xcdTA0MzVcXHUwNDNEXFx1MDQ0MlxcdTA0MzBcXHUwNDQwXFx1MDQzOFxcdTA0MzhcIiB9KSwgc3RhdHVzT2ZDb21tZW50c0xvYWRpbmcgPT09IExvYWRpbmdTdGF0dXNlcy5wZW5kaW5nICYmIF9qc3goVGhyZWVEb3RzU3Bpbm5lciwge30pLCBzdGF0dXNPZkNvbW1lbnRzTG9hZGluZyA9PT0gTG9hZGluZ1N0YXR1c2VzLmZ1bGZpbGxlZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cy5tYXAoKGNvbW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29tbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfanN4KENhcmRPZkNvbW1lbnQsIHsgY29tbWVudDogY29tbWVudCB9LCBjb21tZW50LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldIH0pKV0gfSldIH0pKSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/PostPage.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("aecc4a84acc729e463ec")
/******/ })();
/******/ 
/******/ }
);