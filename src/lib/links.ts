// Central place for external links / contact points.
// TODO(founder): replace the store URLs with the real listings once live.
export const APP_STORE_URL = "https://apps.apple.com/app/skeined/id000000000"; // TODO: real App Store id
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.malhq.skeined"; // TODO: confirm full URL once live
export const APP_DEEP_LINK = "skeined://"; // custom URL scheme handled by the app

export const SUPPORT_EMAIL = "support@skeined.com";

// TODO(founder): confirm before publishing — is Android live, or "coming soon"?
export const ANDROID_AVAILABLE = false;

/**
 * Where /beta sends people to sign up as an Android tester.
 *
 * Short link rather than the docs.google.com/forms/d/e/1FAIpQLSd3wf… form it
 * redirects to: it survives being read aloud, and it fits in an Instagram
 * story sticker. Verified 2026-08-23 (302 → the live form).
 *
 * If /beta ever shows "sign-ups open in a moment" instead of a button, this
 * is empty — that fallback is deliberate, so a dead link never goes out on a
 * story. Set it back and the button returns.
 */
export const BETA_FORM_URL = "https://forms.gle/jHFBz9c6WbyjKYS67";
