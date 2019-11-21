import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faBellSlash, faBell, faChevronDown, faChevronUp, faLongArrowAltRight, faLongArrowAltLeft, faTimes, faPlay, faPause, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas, faFacebookF, faInstagram, faTwitter)

export const LongArrowRight = () => <FontAwesomeIcon icon={faLongArrowAltRight} />
export const LongArrowLeft = () => <FontAwesomeIcon icon={faLongArrowAltLeft} />

export const CloseButton = () => <FontAwesomeIcon icon={faTimes} />
export const PlayButton = () => <FontAwesomeIcon icon={faPlay} />
export const PauseButton = () => <FontAwesomeIcon icon={faPause} />
export const VolumeOn = () => <FontAwesomeIcon icon={faVolumeUp} />
export const VolumeOff = () => <FontAwesomeIcon icon={faVolumeMute} />
export const BellSlash = () => <FontAwesomeIcon icon={faBellSlash} />
export const Bell = () => <FontAwesomeIcon icon={faBell} />

export const ChevronDown = () => <FontAwesomeIcon icon={faChevronDown} />
export const ChevronUp = () => <FontAwesomeIcon icon={faChevronUp} />

export const Facebook = () => <FontAwesomeIcon icon={['fab', 'facebook-f']} />
export const Instagram = () => <FontAwesomeIcon icon={['fab', 'instagram']} />
export const Twitter = () => <FontAwesomeIcon icon={['fab', 'twitter']} />

export default { LongArrowRight, LongArrowLeft, ChevronDown, Facebook, Instagram, Twitter };