import {
    animate as rawAnimate,
    createTimeline as rawCreateTimeline,
    stagger,
    scrambleText,
    createSpring,
    spring,
    createScope,
    utils,
} from "animejs";
import { getAnimationsEnabled } from "./motion";

/**
 * Executes an Anime.js animation that respects user-reduced motion preferences.
 * When motion is disabled, animations resolve immediately (duration 0).
 */
export const animate = (targets, params = {}) => {
    if (!getAnimationsEnabled()) {
        return rawAnimate(targets, {
            ...params,
            duration: 0,
            delay: 0,
        });
    }
    return rawAnimate(targets, params);
};

/**
 * Creates an Anime.js timeline that respects user-reduced motion preferences.
 */
export const createTimeline = (params = {}) => {
    if (!getAnimationsEnabled()) {
        return rawCreateTimeline({
            ...params,
            defaults: {
                ...(params?.defaults || {}),
                duration: 0,
                delay: 0,
            },
        });
    }
    return rawCreateTimeline(params);
};

export {
    rawAnimate,
    rawCreateTimeline,
    stagger,
    scrambleText,
    createSpring,
    spring,
    createScope,
    utils,
};

export default animate;
