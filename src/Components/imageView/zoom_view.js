import React, { Component, createRef } from 'react';
import { View, Animated, Image } from 'react-native';

const ChildStatus = { SINGLE: "Child::SINGLE", DOUBLE: "Child::DOUBLE", OTHER: "Child::OTHER" };
const DOUBLE_TOUCH_THRES = 300;
const MAX_ZOOM = 5;
const DEFAULT_ZOOM = 2;
const MIN_ZOOM = 0.5;
const MAX_ZOOM_RESET = 1.3;
const MIN_ZOOM_RESET = 0.0;
const SOFT_ANIMIATION_TIME = 300;
const positionMult = (input, value) => { return { x: input.x * value, y: input.y * value } };

export default class ZoomView extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.initialData };
        this.viewPort = { width: this.props.width, height: this.props.height }
        this.childDoingZoom = false;
        this.scaleTarget = 1;
        this.scaleAnimated = new Animated.Value(this.scaleTarget);
        this.transformBase = { x: 0, y: 0 };
        this.transformAnimated = new Animated.ValueXY(positionMult(this.transformBase, 1 - this.scaleTarget));
        this.rootView = createRef();
        this.absolutePosition = { x: 0, y: 0 };
        this.doingChildAnimation = false;
        this.childState = { status: ChildStatus.OTHER, lastTouch: 0 };
        this.gestureHandlers = {
            onStartShouldSetResponder: (event) => {
                const ret = this.childDoingZoom;
                if (ret === false && event.nativeEvent.touches.length === 1) {
                    this.onStartTouchResponder(event);
                }
                this.doChildStateChange({ ...this.childState, status: ChildStatus.OTHER });
                return ret;
            },
            onMoveShouldSetResponder: (event) => {
                const ret = this.childDoingZoom || event.nativeEvent.touches.length > 1;
                return ret;
            },
            onResponderTerminationRequest: (event) => {
                const ret = this.childDoingZoom || event.nativeEvent.touches.length > 1;
                return !ret;
            },
            onStartShouldSetResponderCapture: (event) => {
                const ret = this.childDoingZoom || event.nativeEvent.touches.length > 1;
                return ret;
            },
            onMoveShouldSetResponderCapture: (event) => {
                const ret = this.childDoingZoom || event.nativeEvent.touches.length > 1;
                return ret;
            },
            onResponderMove: (event) => {
                this.onMoveTouchResponder(event);
            },
            onResponderRelease: (_event) => {
                this.doChildStateChange({ ...this.childState, status: ChildStatus.OTHER });
                if (this.scaleTarget > MIN_ZOOM_RESET && this.scaleTarget < MAX_ZOOM_RESET) {
                    this.doChildReset(SOFT_ANIMIATION_TIME);
                }
            },
            onResponderReject: (_event) => {
                this.doChildStateChange({ ...this.childState, status: ChildStatus.OTHER });
            },
            onResponderTerminate: (_event) => {
                this.doChildStateChange({ ...this.childState, status: ChildStatus.OTHER });
            },
            onResponderStart: (event) => {
                if (event.nativeEvent.touches.length === 1) {
                    this.onStartTouchResponder(event);
                } else {
                    this.onMoveTouchResponder(event);
                }
            },
        }
    }

    onStartTouchResponder(event) {
        const timediff = event.timeStamp - this.childState.lastTouch;
        const newPos = { x: event.nativeEvent.pageX - this.absolutePosition.x, y: event.nativeEvent.pageY - this.absolutePosition.y };
        if (timediff < DOUBLE_TOUCH_THRES) {
            this.childState.lastTouch = 0;
            if (this.childState.status !== ChildStatus.SINGLE)
                this.doChildDoubleTouch(newPos);
        } else {
            this.childState.lastTouch = event.timeStamp;
            this.doChildStateChange({ ...this.childState, initial: newPos, last: newPos, timestamp: event.timeStamp, status: ChildStatus.SINGLE });
        }
    }

    onMoveTouchResponder(event) {
        switch (event.nativeEvent.touches.length) {
            case 1: {
                const newPos = { x: event.nativeEvent.pageX - this.absolutePosition.x, y: event.nativeEvent.pageY - this.absolutePosition.y };
                if (this.childState.status === ChildStatus.SINGLE) {
                    this.doChildStateChange({ ...this.childState, last: newPos, timestamp: event.timeStamp, status: ChildStatus.SINGLE });
                } else {
                    this.doChildStateChange({ ...this.childState, initial: newPos, last: newPos, timestamp: event.timeStamp, status: ChildStatus.SINGLE });
                }
                break;
            }
            case 2: {
                const touchA = { x: event.nativeEvent.touches[0].pageX - this.absolutePosition.x, y: event.nativeEvent.touches[0].pageY - this.absolutePosition.y };
                const touchB = { x: event.nativeEvent.touches[1].pageX - this.absolutePosition.x, y: event.nativeEvent.touches[1].pageY - this.absolutePosition.y };
                const newPinch = {
                    center: { x: (touchA.x + touchB.x) / 2, y: (touchA.y + touchB.y) / 2 },
                    distance: Math.sqrt(Math.pow(touchA.x - touchB.x, 2) + Math.pow(touchA.y - touchB.y, 2))
                };
                if (this.childState.status === ChildStatus.DOUBLE) {
                    this.doChildPinchMove(this.childState.last, newPinch, this.childState.timestamp - event.timeStamp);
                    this.doChildStateChange({ ...this.childState, timestamp: event.timeStamp, last: newPinch, status: ChildStatus.DOUBLE });
                } else {
                    this.doChildStateChange({ ...this.childState, initial: newPinch, timestamp: event.timeStamp, last: newPinch, status: ChildStatus.DOUBLE });
                }
                break;
            }
            default: {
                this.doChildStateChange({ ...this.childState, status: ChildStatus.OTHER });
                break;
            }
        }
    }

    doChildStateChange(to) {
        if (this.childState.status !== to.status) {
            if (to.status !== ChildStatus.SINGLE) {
                this.childState.lastTouch = 0;
            }
            if (to.status === ChildStatus.DOUBLE) {
                this.childDoingZoom = true;
            }
        }
        this.childState = to;
    }

    doChildReset(timing) {
        this.scaleTarget = 1;
        this.transformBase.x = 0;
        this.transformBase.y = 0;
        this.doChildAnimation(timing, () => { this.childDoingZoom = false }, true);
    }

    doChildAnimation(timing, callback = () => { }, override = false) {
        if (this.doingChildAnimation === true && !override)
            return;
        if (override) {
            this.scaleAnimated.stopAnimation();
            this.transformAnimated.stopAnimation();
        }
        this.doingChildAnimation = true;
        this.childDoingZoom = true;
        const boundScaleTarget = Math.max(Math.min(this.scaleTarget, MAX_ZOOM), MIN_ZOOM);
        this.scaleTarget = boundScaleTarget;
        const boundDisposition = positionMult(this.transformBase, 1);
        const maxX = (this.viewPort.width * Math.abs(1 - boundScaleTarget)) / 2;
        const maxY = (this.viewPort.height * Math.abs(1 - boundScaleTarget)) / 2;
        boundDisposition.x = Math.max(Math.min(boundDisposition.x, maxX), -maxX);
        boundDisposition.y = Math.max(Math.min(boundDisposition.y, maxY), -maxY);
        this.transformBase = boundDisposition;
        Animated.parallel([Animated.timing(this.scaleAnimated, { duration: timing, toValue: this.scaleTarget, useNativeDriver: true, }), Animated.timing(this.transformAnimated, { duration: timing, toValue: this.transformBase, useNativeDriver: true, })], { stopTogether: true }).start(() => {
            callback();
            this.doingChildAnimation = false;
        });
    }

    centerPosition() {
        return { x: this.viewPort.width / 2, y: this.viewPort.height / 2 };
    }

    getCenterDisposition(pos) {
        const center = this.centerPosition();
        if (pos.x > 0)
            return { x: pos.x - center.x, y: pos.y - center.y }
        else
            return { x: center.y + 50 + pos.x - center.x, y: pos.y - center.y }
    }

    doChildDoubleTouch(secondTouch) {
        if (!this.childDoingZoom) {
            const scale = DEFAULT_ZOOM;
            const center = this.getCenterDisposition(secondTouch);
            this.doChangeScale({ x: 0, y: 0 }, scale, center);
            this.doChildAnimation(SOFT_ANIMIATION_TIME, () => { }, true);
        } else {
            this.doChildReset(SOFT_ANIMIATION_TIME);
        }
    }

    doChildPinchMove(prev, next, timeDiff) {
        const newDisposition = { x: (next.center.x - prev.center.x), y: (next.center.y - prev.center.y) };
        const updateScale = next.distance / prev.distance;
        this.doChangeScale(newDisposition, updateScale, this.getCenterDisposition(prev.center));
        this.doChildAnimation(timeDiff);
    }

    doChangeScale(updateDisposition, updateScale, updateCenter) {
        const newScale = this.scaleTarget * updateScale;
        const origDisposition = this.transformBase;
        const centerToCenterDisposition = { x: 0, y: 0 };
        if (updateCenter !== undefined) {
            centerToCenterDisposition.x = updateCenter.x - origDisposition.x;
            centerToCenterDisposition.y = updateCenter.y - origDisposition.y;
        }
        const newDisposition = positionMult(updateDisposition, 1);
        let newCenterDisposition = positionMult(centerToCenterDisposition, (1 - updateScale));
        const disposition = { x: origDisposition.x + newDisposition.x + newCenterDisposition.x, y: origDisposition.y + newDisposition.y + newCenterDisposition.y, };
        this.transformBase = disposition;
        this.scaleTarget = newScale;
    }

    render() {
        var { data } = this.state;
        return (
            <View style={{ height: this.viewPort.height, width: this.viewPort.width, backgroundColor: "#0000" }} ref={this.rootView}
                {...(this.gestureHandlers)}
                onLayout={() => {
                    this.rootView.current?.measure(
                        (_x, _y, _width, _height, pageX, pageY) => {
                            this.absolutePosition = { x: pageX, y: pageY }
                        },
                    );
                }}>
                <View style={{ height: this.viewPort.height, width: this.viewPort.width, overflow: "hidden", flex: 1, }}>
                    <Animated.View style={{ height: this.viewPort.height, width: this.viewPort.width, flex: 1, alignItems: 'center', justifyContent: 'center', overflow: "hidden", transform: [{ translateX: this.transformAnimated.x }, { translateY: this.transformAnimated.y }, { scale: this.scaleAnimated }], }}>
                        <Image source={data} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                    </Animated.View>
                </View >
            </View >
        );
    }
}