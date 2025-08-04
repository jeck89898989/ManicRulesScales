import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
    const fretboard = document.getElementById('fretboard');
    const toggleAllNotes = document.getElementById('show-notes-toggle');
    const keySelect = document.getElementById('key-select');
    const scaleSelect = document.getElementById('scale-select');
    const fretboardSelect = document.getElementById('fretboard-material-select');
    const stringWidthSlider = document.getElementById('string-width');
    const stringWidthValue = document.getElementById('string-width-value');
    const fretWidthSlider = document.getElementById('fret-width');
    const fretWidthValue = document.getElementById('fret-width-value');
    const noteColorPreset = document.getElementById('note-color-preset');
    const inlayColorInput = document.getElementById('inlay-color-input'); 
    const noteDisplayType = document.getElementById('note-display-type');
    const fretColorInput = document.getElementById('fret-color');
    const stringColorInput = document.getElementById('string-color');
    const noteFontColorInput = document.getElementById('note-font-color');
    const noteFontSelect = document.getElementById('note-font-select');
    const pageThemeSelect = document.getElementById('page-theme-select');
    const currentSelectionDisplay = document.getElementById('current-selection-display');
    const currentSelectionIntervals = document.getElementById('current-selection-intervals');
    const currentSelectionNotes = document.getElementById('current-selection-notes');
    const currentSelectionNotesEnharmonicSharp = document.getElementById('current-selection-notes-enharmonic-sharp');
    const currentSelectionNotesEnharmonicFlat = document.getElementById('current-selection-notes-enharmonic-flat');
    const noteShapeSelect = document.getElementById('note-shape-select'); 
    const fretNumbersDisplay = document.getElementById('fret-numbers-display'); 
    const noteSizeSlider = document.getElementById('note-size');
    const noteSizeValue = document.getElementById('note-size-value');

    // New strings control
    const instrumentSelect = document.getElementById('instrument-select');
    const numStringsSelect = document.getElementById('num-strings-select');

    // New Fretboard View select
    const fretboardViewSelect = document.getElementById('fretboard-view-select');

    // Quiz elements
    const quizTypeSelect = document.getElementById('quiz-type-select');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const stopQuizBtn = document.getElementById('stop-quiz-btn');

    // Modal elements for fretboard controls
    const openFretboardControlsBtn = document.getElementById('open-fretboard-controls-btn');
    const controlsModal = document.getElementById('fretboard-controls-modal');
    const closeControlsModalBtn = controlsModal.querySelector('.close-modal');
    const modalControlsContent = document.getElementById('modal-controls-content');
    
    // New modal elements for custom themes
    const openCustomThemesBtn = document.getElementById('open-custom-themes-btn');
    const customThemesModal = document.getElementById('custom-themes-modal');
    const closeCustomThemesModalBtn = customThemesModal.querySelector('.close-modal');
    const modalCustomThemesContent = document.getElementById('modal-custom-themes-content');

    // New modal elements for fret range
    const openFretRangeBtn = document.getElementById('open-fret-range-btn');
    const fretRangeModal = document.getElementById('fret-range-modal');
    const closeFretRangeModalBtn = fretRangeModal.querySelector('.close-modal');
    const modalFretRangeContent = document.getElementById('modal-fret-range-content');

    // Move controls into modal
    const mainControlsContentDiv = document.getElementById('main-controls-content');
    const controlsDiv = mainControlsContentDiv.querySelector('.controls');
    if (controlsDiv) {
        // Find the location of the new instrument select and insert after.
        const numStringsSelectDiv = modalControlsContent.querySelector('.control-group[style*="display:none"]');
        if (numStringsSelectDiv) {
            numStringsSelectDiv.insertAdjacentElement('afterend', controlsDiv);
        } else {
             modalControlsContent.appendChild(controlsDiv);
        }
    }
    // Now hide the original wrapper
    document.getElementById('main-controls-section-wrapper').style.display = 'none';

    // Move "Custom Themes" content into its modal
    const customThemesContentDiv = document.getElementById('custom-themes-content');
    if (customThemesContentDiv) {
        // Find the actual content inside and move it.
        const contentToMove = customThemesContentDiv.querySelector('.custom-slideshow-section');
        if (contentToMove) {
            modalCustomThemesContent.appendChild(contentToMove);
        }
    }
    // Hide the original wrapper for custom themes
    document.getElementById('custom-themes-section-wrapper').style.display = 'none';

    // Move "Fret Range" content into its modal
    const fretRangeSectionWrapper = document.getElementById('fret-range-section-wrapper');
    const fretRangeContentDiv = document.getElementById('fret-range-content');
    if (fretRangeContentDiv) {
        modalFretRangeContent.appendChild(fretRangeContentDiv);
        // The header is outside the content div, so we need to handle that if we want it.
        // Let's just use the modal's built-in title.
        const header = fretRangeSectionWrapper.querySelector('.collapsible-header');
        if(header) header.style.display = 'none'; // hide original header
        fretRangeContentDiv.classList.remove('collapsed'); // Make sure it's visible inside the modal
    }
     // Hide the original wrapper for fret range
    if(fretRangeSectionWrapper) fretRangeSectionWrapper.style.display = 'none';

    // Custom theme controls
    const customThemesHeader = document.getElementById('custom-themes-header');
    const customThemesContent = document.getElementById('custom-themes-content');
    const customSlideshowName = document.getElementById('custom-slideshow-name');
    const itemKeySelect = document.getElementById('item-key-select');
    const itemTypeSelect = document.getElementById('item-type-select');
    const itemNameSelect = document.getElementById('item-name-select');
    const itemDescription = document.getElementById('item-description');
    const itemMeasures = document.getElementById('item-measures');
    const addSlideshowItem = document.getElementById('add-slideshow-item');
    const customSlideshowItems = document.getElementById('custom-slideshow-items');
    const saveCustomSlideshow = document.getElementById('save-custom-slideshow');
    const clearCustomSlideshow = document.getElementById('clear-custom-slideshow');
    const customColorName = null; // document.getElementById('custom-color-name');
    const customDefaultColor = null; // document.getElementById('custom-default-color');
    const customScaleColor = null; // document.getElementById('custom-scale-color');
    const customRootColor = null; // document.getElementById('custom-root-color');
    const saveCustomColors = null; // document.getElementById('save-custom-colors');
    const customFretName = null; // document.getElementById('custom-fret-name');
    const customFretLineColor = null; // document.getElementById('custom-fret-line-color');
    const customStringMaterialColor = null; // document.getElementById('custom-string-material-color');
    const customDotColor = null; // document.getElementById('custom-dot-color');
    const saveCustomFretMaterial = null; // document.getElementById('save-custom-fret-material');

    // New CSV import/export elements
    const importSlideshowBtn = document.getElementById('import-slideshow-btn');
    const importSlideshowFileInput = document.getElementById('import-slideshow-file-input');
    const downloadSlideshowTemplateBtn = document.getElementById('download-slideshow-template-btn');
    const customSlideshowsOptgroup = document.getElementById('custom-slideshows-optgroup');
    const downloadAllDefinitionsBtn = document.getElementById('download-all-definitions-btn');

    // Main controls collapsible elements
    const mainControlsHeader = document.getElementById('main-controls-header');
    const mainControlsContent = document.getElementById('main-controls-content');

    // Slideshow buttons
    const slideshowPlay = document.getElementById('slideshow-play');
    const slideshowStop = document.getElementById('slideshow-stop');
    const slideshowBpm = document.getElementById('slideshow-bpm');
    const slideshowTranspose = document.getElementById('slideshow-transpose');
    const slideshowSelect = document.getElementById('slideshow-select');
    const slideshowBaseKey = document.getElementById('slideshow-base-key');
    const slideshowTimeRemaining = document.getElementById('slideshow-time-remaining');
    const slideshowItemDescription = document.getElementById('slideshow-item-description');

    const NUM_FRETS = 15; 
    let TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; 
    const ALL_NOTES = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
    const CHROMATIC_SCALE_SHARPS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    const CHROMATIC_SCALE_FLATS = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    const CHROMATIC_SCALE = CHROMATIC_SCALE_SHARPS; // Use sharps as the internal reference

    const SOLFEGE_CHROMATIC = ['La', 'Li', 'Ti', 'Do', 'Di', 'Re', 'Ri', 'Mi', 'Fa', 'Fi', 'Sol', 'Si'];

    const ENHARMONIC_MAP = {
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
    };

    function getEnharmonicDisplay(note, preferFlat = false) {
        if (preferFlat && ENHARMONIC_MAP[note] && CHROMATIC_SCALE_FLATS.includes(ENHARMONIC_MAP[note])) {
             return ENHARMONIC_MAP[note];
        }
        if (!preferFlat && ENHARMONIC_MAP[note] && CHROMATIC_SCALE_SHARPS.includes(note)) {
            return note;
        }
        if(ENHARMONIC_MAP[note]) { // Fallback
            return ENHARMONIC_MAP[note];
        }
        return note;
    }

    // Global variables for custom themes
    let customSlideshowData = [];

    // Global variables for quiz
    let isQuizActive = false;
    let currentQuizType = 'none';
    let currentQuestionData = {};

    // Scale definitions (intervals from root)
    const SCALES = {
        chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10],
        'pentatonic-major': [0, 2, 4, 7, 9],
        'pentatonic-minor': [0, 3, 5, 7, 10],
        blues: [0, 3, 5, 6, 7, 10],
        dorian: [0, 2, 3, 5, 7, 9, 10],
        mixolydian: [0, 2, 4, 5, 7, 9, 10],
        phrygian: [0, 1, 3, 5, 7, 8, 10],
        lydian: [0, 2, 4, 6, 7, 9, 11],
        locrian: [0, 1, 3, 5, 6, 8, 10],
        'harmonic-minor': [0, 2, 3, 5, 7, 8, 11],
        'melodic-minor': [0, 2, 3, 5, 7, 9, 11],
        'whole-tone': [0, 2, 4, 6, 8, 10],
        diminished: [0, 1, 3, 4, 6, 7, 9, 10],
        // Additional scales
        ionian: [0, 2, 4, 5, 7, 9, 11],
        aeolian: [0, 2, 3, 5, 7, 8, 10],
        'hungarian-minor': [0, 2, 3, 6, 7, 8, 11],
        'neapolitan-minor': [0, 1, 3, 5, 7, 8, 11],
        'neapolitan-major': [0, 1, 3, 5, 7, 9, 11],
        'persian': [0, 1, 4, 5, 6, 8, 11],
        'enigmatic': [0, 1, 4, 6, 8, 10, 11],
        'double-harmonic-major': [0, 1, 4, 5, 7, 8, 10],
        'byzantine': [0, 1, 4, 5, 7, 8, 11],
        'arabic': [0, 1, 4, 5, 6, 8, 10],
        'hirajoshi': [0, 2, 3, 7, 8],
        'pentatonic-blues': [0, 3, 5, 6, 7, 10],
        'minor-blues': [0, 3, 5, 6, 7, 10],
        'gypsy': [0, 1, 4, 5, 7, 8, 10],
        'altered': [0, 1, 3, 4, 6, 8, 10],
        // New scales to double the count
        'spanish-phrygian': [0, 1, 4, 5, 7, 8, 10],
        'jewish-ahava-rabbah': [0, 1, 4, 5, 7, 8, 10],
        'japanese-in-sen': [0, 1, 5, 7, 10],
        'chinese-pentatonic': [0, 2, 4, 7, 9],
        'mongolian': [0, 2, 4, 7, 9],
        'indian-raga-bhairav': [0, 1, 4, 5, 7, 8, 11],
        'indian-raga-yaman': [0, 2, 4, 6, 7, 9, 11],
        'greek-dorian': [0, 1, 3, 5, 7, 8, 10],
        'prometheus': [0, 2, 4, 6, 9, 10],
        'tritone-scale': [0, 1, 4, 6, 7, 10],
        'augmented-scale': [0, 3, 4, 7, 8, 11],
        'bebop-dominant': [0, 2, 4, 5, 7, 9, 10, 11],
        'bebop-major': [0, 2, 4, 5, 7, 8, 9, 11],
        'bebop-minor': [0, 2, 3, 5, 7, 8, 9, 10],
        'half-whole-diminished': [0, 1, 3, 4, 6, 7, 9, 10],
        'lydian-diminished': [0, 2, 3, 6, 7, 9, 11],
        'super-locrian': [0, 1, 3, 4, 6, 8, 10],
        'mixolydian-b6': [0, 2, 4, 5, 7, 9, 10],
        'dorian-b2': [0, 1, 3, 5, 7, 9, 10],
        'phrygian-dominant': [0, 0, 3, 5, 7, 8, 10],
        'harmonic-major': [0, 2, 4, 5, 7, 8, 11],
        'double-harmonic-minor': [0, 1, 4, 5, 6, 8, 11],
        'hungarian-major': [0, 3, 4, 6, 7, 9, 10],
        'romanian-minor': [0, 2, 3, 6, 7, 9, 10],
        'ukrainian-dorian': [0, 2, 3, 6, 7, 9, 10],
        'flamenco': [0, 1, 4, 5, 7, 8, 11],
        'andalusian': [0, 1, 4, 5, 7, 8, 10],
        'maqam-hijaz': [0, 1, 3, 5, 7, 8, 11],
        'maqam-kurd': [0, 1, 3, 5, 7, 8, 10],
        'overtone-scale': [0, 2, 4, 6, 7, 9, 10],
        'scriabin-mystic': [0, 2, 4, 6, 9, 10],
        'petrushka-chord': [0, 1, 4, 6, 7, 10],
        'octatonic': [0, 1, 3, 4, 6, 7, 9, 10],
        'balinese-pelog': [0, 1, 3, 7, 8],
        'javanese-slendro': [0, 2, 5, 7, 9],
        'egyptian': [0, 2, 3, 6, 7, 8, 11],
        'ethiopian': [0, 2, 4, 5, 7, 8, 11],
        'jewish-minor': [0, 1, 3, 5, 7, 8, 10],
        'klezmer': [0, 1, 4, 5, 7, 8, 10],
        'todi-raga': [0, 1, 3, 6, 7, 8, 11],
        'marva-raga': [0, 1, 4, 6, 7, 9, 11],
        'purvi-raga': [0, 1, 4, 6, 7, 8, 11],
        // More Scales from the dropdown
        'lydian-augmented': [0, 2, 4, 6, 8, 9, 11],
        'dorian-sharp-11': [0, 2, 3, 6, 7, 9, 10],
        'phrygian-sharp-3': [0, 1, 4, 5, 7, 8, 10],
        'locrian-natural-6': [0, 1, 3, 5, 6, 9, 10],
        'leading-whole-tone': [0, 2, 4, 6, 8, 9, 10],
        'blues-major-scale': [0, 2, 3, 4, 7, 9],
        'chromatic-blues-scale': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'prometheus-neapolitan': [0, 1, 4, 6, 9, 10],
        'eight-tone-spanish': [0, 1, 3, 4, 5, 6, 8, 10],
        'enigmatic-minor': [0, 1, 3, 6, 7, 10, 11],
        'oriental-scale': [0, 1, 4, 5, 6, 9, 10],
        'flamenco-minor': [0, 1, 3, 4, 7, 8, 11],
        'hindu': [0, 2, 4, 5, 7, 8, 10],
        'jazz-phrygian': [0, 1, 3, 5, 7, 8, 10],
        'gamelan': [0, 1, 3, 7, 8],
        'super-phrygian': [0, 1, 3, 4, 7, 8, 10],
        'enigmatic-diminished': [0, 1, 3, 4, 7, 8, 11],
        'harmonic-augmented': [0, 3, 4, 7, 8, 11],
        'mixolydian-augmented': [0, 2, 4, 5, 8, 9, 10],
        'phrygian-mixolydian': [0, 1, 4, 5, 7, 9, 10],
        'lydian-diminished': [0, 2, 3, 6, 7, 9, 11],
        'ultraphrygian': [0, 1, 3, 4, 7, 8, 10],
        'half-diminished-bebop': [0, 2, 3, 5, 6, 8, 9, 10],
        'major-locrian-scale': [0, 2, 4, 5, 6, 8, 10],
        'minor-neapolitan-alt': [0, 1, 2, 4, 7, 8, 11],
        'major-neapolitan-alt': [0, 1, 2, 4, 6, 7, 11],
        'double-chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'gregorian-major': [0, 2, 4, 5, 7, 9, 11],
        'gregorian-minor': [0, 2, 3, 5, 7, 8, 10],
        'blues-dorian': [0, 2, 3, 5, 6, 7, 9, 10],
        'blues-mixolydian': [0, 2, 3, 4, 5, 7, 9, 10],
        'diminished-blues': [0, 1, 3, 4, 5, 6, 7, 9, 10],
        'major-pentatonic-add-4': [0, 2, 4, 5, 7, 9],
        'minor-pentatonic-add-2': [0, 2, 3, 5, 7, 10],
        'augmented-pentatonic': [0, 3, 4, 7, 8],
        'diminished-pentatonic': [0, 3, 5, 6, 9],
        'whole-tone-pentatonic': [0, 2, 4, 6, 8],
        'lydian-pentatonic': [0, 2, 6, 7, 11],
        'mixolydian-pentatonic': [0, 2, 5, 7, 10],
        'phrygian-pentatonic': [0, 3, 5, 8, 10],
        'locrian-pentatonic': [0, 3, 5, 6, 8],
        'harmonic-minor-pentatonic': [0, 3, 5, 7, 11],
        'melodic-minor-pentatonic': [0, 3, 5, 7, 9],
        'bebop-dominant-alt': [0, 1, 2, 3, 4, 5, 7, 10],
        'bebop-major-alt': [0, 2, 3, 4, 5, 7, 8, 11],
        'bebop-minor-alt': [0, 2, 3, 4, 5, 7, 9, 10],
        'blues-bebop': [0, 2, 3, 4, 5, 6, 7, 9, 10],
        'dorian-bebop': [0, 2, 3, 4, 5, 7, 9, 10],
        'lydian-bebop': [0, 2, 4, 5, 6, 7, 9, 11],
        'mixolydian-bebop-alt': [0, 2, 4, 5, 6, 7, 8, 10],
        'phrygian-bebop': [0, 1, 2, 3, 5, 7, 8, 10],
        'harmonic-minor-bebop': [0, 2, 3, 5, 7, 8, 10, 11],
        'melodic-minor-bebop': [0, 2, 3, 5, 7, 8, 9, 11],
        'whole-tone-bebop': [0, 2, 4, 6, 7, 8, 10],
        'diminished-bebop': [0, 1, 2, 3, 4, 6, 7, 9],
        'tritone-pentatonic': [0, 1, 4, 6, 7],
        'augmented-diminished': [0, 1, 3, 4, 7, 8],
        'lydian-phrygian': [0, 1, 4, 6, 7, 9, 11],
        'mixolydian-lydian': [0, 2, 4, 6, 7, 9, 10],
        'phrygian-locrian': [0, 1, 3, 5, 6, 8, 10],
        'ionian-flat-5': [0, 2, 4, 6, 7, 9, 11],
        'aeolian-sharp-7': [0, 2, 3, 5, 7, 8, 11],
        'dorian-flat-4': [0, 2, 3, 4, 7, 9, 10],
        'lydian-flat-2': [0, 1, 4, 6, 7, 9, 11],
        'mixolydian-sharp-5': [0, 2, 4, 5, 8, 9, 10],
        'locrian-sharp-4': [0, 1, 3, 6, 7, 8, 10],
        'major-minor-scale': [0, 2, 4, 5, 7, 8, 10],
        'persian-augmented': [0, 1, 4, 5, 8, 9, 11],
        'romanian-major': [0, 2, 4, 6, 7, 9, 10],
        'ukrainian-major': [0, 2, 3, 6, 7, 9, 11],
        'hungarian-major-alt': [0, 3, 4, 6, 7, 8, 10],
        'enigmatic-harmonic': [0, 1, 4, 5, 7, 8, 11],
        'whole-tone-major': [0, 2, 4, 6, 8, 10],
        'diminished-major': [0, 2, 3, 4, 6, 7, 9, 11],
        'chromatic-minor': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'pentatonic-hybrid': [0, 2, 3, 7, 9],
        // Intervals
        unison: [0],
        'minor-2nd': [0, 1],
        'major-2nd': [0, 2],
        'minor-3rd': [0, 3],
        'major-3rd': [0, 4],
        'perfect-4th': [0, 5],
        tritone: [0, 6],
        'perfect-5th': [0, 7],
        'minor-6th': [0, 8],
        'major-6th': [0, 9],
        'minor-7th': [0, 10],
        'major-7th': [0, 11],
        octave: [0],
        // Chords
        'major-triad': [0, 4, 7],
        'minor-triad': [0, 3, 7],
        'diminished': [0, 3, 6],
        'augmented': [0, 4, 8],
        'sus2': [0, 2, 7],
        'sus4': [0, 5, 7],
        'dom7': [0, 4, 7, 10],
        'maj7': [0, 4, 7, 11],
        'min7': [0, 3, 7, 10],
        'min-maj7': [0, 3, 7, 11],
        'dim7': [0, 3, 6, 9],
        'half-dim7': [0, 3, 6, 10],
        'add9': [0, 2, 4, 7],
        'add11': [0, 4, 5, 7],
        '6': [0, 4, 7, 9],
        'm6': [0, 3, 7, 9],
        '9': [0, 2, 4, 7, 10],
        'm9': [0, 2, 3, 7, 10],
        'maj9': [0, 2, 4, 7, 11],
        '11': [0, 2, 4, 5, 7, 10],
        'm11': [0, 2, 3, 5, 7, 10],
        'maj11': [0, 2, 4, 5, 7, 11],
        '13': [0, 2, 4, 7, 9, 10],
        'm13': [0, 2, 3, 7, 9, 10],
        'maj13': [0, 2, 4, 7, 9, 11],
        '7b5': [0, 4, 6, 10]
    };

    const TUNING_PRESETS = {
        'guitar-6-standard': { strings: 6, tuning: ['E', 'B', 'G', 'D', 'A', 'E'] },
        'guitar-6-drop-d': { strings: 6, tuning: ['E', 'B', 'G', 'D', 'A', 'D'] },
        'guitar-6-open-g': { strings: 6, tuning: ['D', 'B', 'G', 'D', 'G', 'D'] },
        'guitar-6-open-d': { strings: 6, tuning: ['D', 'A', 'F#', 'D', 'A', 'D'] },
        'guitar-7-standard': { strings: 7, tuning: ['E', 'B', 'G', 'D', 'A', 'E', 'B'] },
        'guitar-7-drop-a': { strings: 7, tuning: ['E', 'B', 'G', 'D', 'A', 'E', 'A'] },
        'bass-4-standard': { strings: 4, tuning: ['G', 'D', 'A', 'E'] },
        'bass-4-drop-d': { strings: 4, tuning: ['G', 'D', 'A', 'D'] },
        'bass-5-standard': { strings: 5, tuning: ['G', 'D', 'A', 'E', 'B'] },
        'bass-5-double-bass': { strings: 4, tuning: ['G', 'D', 'A', 'E'] },
        // European Bowed
        'violin': { strings: 4, tuning: ['E', 'A', 'D', 'G'] },
        'viola': { strings: 4, tuning: ['A', 'D', 'G', 'C'] },
        'cello': { strings: 4, tuning: ['A', 'D', 'G', 'C'] },
        'viol-6-string': { strings: 6, tuning: ['D', 'A', 'F', 'C', 'G', 'D'] },
        // Folk & World
        'banjo-tenor-jazz': { strings: 4, tuning: ['A', 'D', 'G', 'C'] },
        'banjo-tenor-irish': { strings: 4, tuning: ['E', 'A', 'D', 'G'] },
        'banjo-plectrum': { strings: 4, tuning: ['D', 'B', 'G', 'C'] },
        'ukulele-soprano': { strings: 4, tuning: ['A', 'E', 'C', 'G'] },
        'cavaquinho-standard': { strings: 4, tuning: ['D', 'B', 'G', 'D'] },
        'irish-fiddle': { strings: 4, tuning: ['E', 'A', 'D', 'G'] },
        'hardanger-fiddle': { strings: 4, tuning: ['E', 'A', 'D', 'A'] },
        'nyckelharpa': { strings: 4, tuning: ['A', 'D', 'G', 'C'] },
        'erhu': { strings: 2, tuning: ['A', 'D'] },
        'shamisen': { strings: 3, tuning: ['C', 'G', 'C'] },
        'morin-khuur': { strings: 2, tuning: ['G', 'C'] },
    };

    // Arrays to categorize scale types for display purposes
    const ALL_SCALES_NAMES = [
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Common"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Pentatonic"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Blues"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Harmonic"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Symmetrical"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Bebop"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="World"] option')),
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Modal"] option'))
    ].map(opt => opt.value);
    const ALL_INTERVALS_NAMES = Array.from(document.querySelectorAll('#scale-select optgroup[label="Intervals"] option')).map(opt => opt.value);
    const ALL_CHORDS_NAMES = [
        ...Array.from(document.querySelectorAll('#scale-select optgroup[label^="Chords"] option'))
    ].map(opt => opt.value);
    ALL_SCALES_NAMES.unshift('chromatic');

    // Generate modes for all scales
    function generateModes() {
        const originalScales = {...SCALES};
        
        for (const [scaleName, intervals] of Object.entries(originalScales)) {
            // Skip chromatic and single-note scales
            if (scaleName === 'chromatic' || intervals.length <= 2) continue;
            
            // Generate modes by rotating intervals
            for (let modeIndex = 1; modeIndex < intervals.length; modeIndex++) {
                const rootInterval = intervals[modeIndex];
                const modeIntervals = [];
                
                for (let i = 0; i < intervals.length; i++) {
                    const originalInterval = intervals[(modeIndex + i) % intervals.length];
                    const normalizedInterval = (originalInterval - rootInterval + 12) % 12;
                    modeIntervals.push(normalizedInterval);
                }
                
                // Sort intervals to ensure consistent representation
                modeIntervals.sort((a, b) => a - b);
                
                // Create a unique identifier for the mode's interval structure
                const modeIntervalsKey = modeIntervals.join('-');
                
                // Check if this mode (by its interval structure) already exists under any name
                const modeExists = Object.values(SCALES).some(existingIntervals => {
                    return existingIntervals.join('-') === modeIntervalsKey;
                });
                
                // Add mode if it doesn't exist
                if (!modeExists) {
                    const modeName = `${scaleName}-mode-${modeIndex + 1}`; // Generic name
                    SCALES[modeName] = modeIntervals;
                }
            }
        }
    }

    // Generate modes on initialization
    generateModes();

    // Populate item name select based on type
    function populateItemNameSelect(type) {
        itemNameSelect.innerHTML = '<option value="">Select item...</option>';
        
        if (type === 'scale') {
            Object.keys(SCALES).filter(s => !ALL_CHORDS_NAMES.includes(s) && !ALL_INTERVALS_NAMES.includes(s)).forEach(scale => {
                const option = document.createElement('option');
                option.value = scale;
                option.textContent = scale.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                itemNameSelect.appendChild(option);
            });
        } else if (type === 'chord') {
            ALL_CHORDS_NAMES.forEach(chord => {
                const option = document.createElement('option');
                option.value = chord;
                option.textContent = chord.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                itemNameSelect.appendChild(option);
            });
        } else if (type === 'interval') {
            ALL_INTERVALS_NAMES.forEach(interval => {
                const option = document.createElement('option');
                option.value = interval;
                option.textContent = interval.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                itemNameSelect.appendChild(option);
            });
        }
    }

    // Custom theme controls
    customThemesHeader.addEventListener('click', () => {
        customThemesContent.classList.toggle('collapsed');
        customThemesHeader.querySelector('.collapse-icon').classList.toggle('rotated');
    });

    // Main controls collapsible functionality (now disabled, kept to prevent errors)
    if (mainControlsHeader) {
        mainControlsHeader.addEventListener('click', () => {
            if (mainControlsContent) {
                mainControlsContent.classList.toggle('collapsed');
                mainControlsHeader.querySelector('.collapse-icon').classList.toggle('rotated');
            }
        });
    }

    // Item type change handler
    itemTypeSelect.addEventListener('change', () => {
        populateItemNameSelect(itemTypeSelect.value);
    });

    // Add slideshow item
    addSlideshowItem.addEventListener('click', () => {
        const type = itemTypeSelect.value;
        const name = itemNameSelect.value;
        const key = itemKeySelect.value;
        const description = itemDescription.value || `${key} ${itemNameSelect.options[itemNameSelect.selectedIndex].textContent}`;
        const measures = parseInt(itemMeasures.value, 10) || 2;
        
        if (!type || !name || !key) {
            alert('Please select item type, name, and key');
            return;
        }
        
        const item = {
            key: key,
            type: type,
            name: name,
            title: itemNameSelect.options[itemNameSelect.selectedIndex].textContent, // Use the display text
            description: description,
            measures: measures
        };
        
        customSlideshowData.push(item);
        updateCustomSlideshowDisplay();
        
        // Clear inputs
        itemKeySelect.value = 'C';
        itemTypeSelect.value = 'scale';
        populateItemNameSelect('scale');
        itemNameSelect.value = '';
        itemDescription.value = '';
        itemMeasures.value = '2';
    });

    // Save custom slideshow
    saveCustomSlideshow.addEventListener('click', () => {
        const name = customSlideshowName.value.trim();
        if (!name) {
            alert('Please enter a name for your slideshow.');
            customSlideshowName.focus();
            return;
        }
        if (customSlideshowData.length === 0) {
            alert('Please add at least one item to your slideshow.');
            return;
        }

        // Create a unique key for the new slideshow
        const slideshowKey = `custom-${name.replace(/\s+/g, '-').toLowerCase()}`;

        // Add the new slideshow to the global SLIDESHOWS object
        // Store a copy, not a reference
        SLIDESHOWS[slideshowKey] = [...customSlideshowData];

        // Create a new option for the select dropdown
        const option = document.createElement('option');
        option.value = slideshowKey;
        option.textContent = name;
        
        // Append the new option to the "Custom Slideshows" optgroup
        if (customSlideshowsOptgroup) {
            customSlideshowsOptgroup.appendChild(option);
        }
        
        // Select the newly created slideshow
        slideshowSelect.value = slideshowKey;
        
        // Provide user feedback and reset the builder
        alert(`Slideshow "${name}" saved!`);
        
        customSlideshowName.value = '';
        customSlideshowData = [];
        updateCustomSlideshowDisplay();
        updateBaseKeyDisplay(); // Update the base key display for the new slideshow
    });

    // Update custom slideshow display
    function updateCustomSlideshowDisplay() {
        if (customSlideshowData.length === 0) {
            customSlideshowItems.innerHTML = '<p>No items added yet</p>';
            return;
        }
        
        customSlideshowItems.innerHTML = '';
        customSlideshowData.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'slideshow-item';
            itemDiv.innerHTML = `
                <div class="slideshow-item-info" style="display: flex; align-items: center; gap: 8px;">
                    <span class="slideshow-item-type">${item.type}</span>
                    <span class="slideshow-item-key">${item.key}</span>
                    <span>${item.title}</span>
                    <span style="font-size: 0.8em; color: #aaa;">(${item.measures} ${item.measures > 1 ? 'measures' : 'measure'})</span>
                </div>
                <button class="slideshow-item-remove" data-index="${index}">Remove</button>
            `;
            customSlideshowItems.appendChild(itemDiv);
        });
        
        // Add remove event listeners
        const removeButtons = customSlideshowItems.querySelectorAll('.slideshow-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                customSlideshowData.splice(index, 1);
                updateCustomSlideshowDisplay();
            });
        });
    }

    // Function to add a slideshow to the main select dropdown
    function addSlideshowToSelect(slideshowKey, slideshowDisplayName) {
        const option = document.createElement('option');
        option.value = slideshowKey;
        option.textContent = slideshowDisplayName;
        slideshowSelect.appendChild(option);
    }

    // Slideshow data structures
    const SLIDESHOWS = {
        'pop-progression': [
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The I chord, the tonic and home base.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The V chord, creating tension that pulls back to the I.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'The vi chord, the relative minor, adding a touch of melancholy.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'The IV chord, the subdominant, providing a sense of release.' }
        ],
        'jazz-progression': [
            { key: 'D', type: 'chord', name: 'min7', title: 'D Minor 7th', description: 'The ii chord, starting the journey away from home.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G Dominant 7th', description: 'The V chord, building strong tension and anticipation.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'C Major 7th', description: 'The I chord, a satisfying resolution and return to home.' }
        ],
        '12-bar-blues': [
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'Bars 1-4: The tonic I chord establishes the key.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7', description: 'Bars 5-6: The subdominant IV chord provides contrast.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'Bars 7-8: Returning to the I chord.' },
            { key: 'B', type: 'chord', name: 'dom7', title: 'B7', description: 'Bar 9: The dominant V chord signals the turnaround.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7', description: 'Bar 10: The IV chord steps down from the V.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'Bars 11-12: The I chord completes the progression, ready to repeat.' }
        ],
        'circle-of-fifths': [
            { key: 'C', type: 'chord', name: 'maj7', title: 'C Major 7', description: 'Start of the cycle (I).' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'F Major 7', description: 'Moving a fourth up (IV).' },
            { key: 'B', type: 'chord', name: 'half-dim7', title: 'B Half-Diminished 7', description: 'The vii° of C, leading to E.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E Dominant 7', description: 'The V chord of A minor.' },
            { key: 'A', type: 'chord', name: 'min7', title: 'A Minor 7', description: 'The relative minor (vi).' },
            { key: 'D', type: 'chord', name: 'min7', title: 'D Minor 7', description: 'The supertonic (ii).' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'The dominant (V).' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'C Major 7', description: 'Resolution back to the tonic (I).' }
        ],
        'andalusian-cadence': [
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'The i chord, setting a dramatic tone.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The VII chord, a step down.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'The VI chord, continuing the descent.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E Dominant 7th', description: 'The V chord, the Phrygian dominant, for a strong cadence.' }
        ],
        '50s-progression': [
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The I chord, the starting point.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'The vi chord, adding a touch of melancholy.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'The IV chord, pre-dominant harmony.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The V chord, leading back to the start.' }
        ],
        'pachelbels-canon': [
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The I chord, the famous beginning.' },
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'The V chord, dominant harmony.' },
            { key: 'B', type: 'chord', name: 'minor-triad', title: 'B Minor', description: 'The vi chord, relative minor.' },
            { key: 'F#', type: 'chord', name: 'minor-triad', title: 'F# Minor', description: 'The iii chord, a minor variation.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The IV chord, subdominant.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The I chord, returning to tonic.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The IV chord again.' },
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'The V chord, completing the cycle.' }
        ],
        'minor-pop-rock': [
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'The i chord, establishing the minor key.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'The VI chord, the major submediant.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The III chord, the relative major.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The VII chord, the subtonic.' }
        ],
        'creep-progression': [
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The I chord. The tonic.' },
            { key: 'B', type: 'chord', name: 'major-triad', title: 'B Major', description: 'The III chord, a chromatic major chord.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The IV chord. The subdominant.' },
            { key: 'C', type: 'chord', name: 'minor-triad', title: 'C Minor', description: 'The iv chord, a minor subdominant for dramatic effect.' }
        ],
        'hotel-california-verse': [
            { key: 'B', type: 'chord', name: 'minor-triad', title: 'B Minor', description: 'i - The tonic minor.' },
            { key: 'F#', type: 'chord', name: 'dom7', title: 'F# Dominant 7', description: 'V7 - The dominant of the key.' },
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'VII - The subtonic.' },
            { key: 'E', type: 'chord', name: 'major-triad', title: 'E Major', description: 'IV - The major subdominant.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'VI - The major submediant.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'III - The relative major.' },
            { key: 'E', type: 'chord', name: 'minor-triad', title: 'E Minor', description: 'iv - The minor subdominant.' },
            { key: 'F#', type: 'chord', name: 'dom7', title: 'F# Dominant 7', description: 'V7 - Leading back to the tonic.' }
        ],
        'la-folia': [
            { key: 'D', type: 'chord', name: 'minor-triad', title: 'D Minor', description: 'i - Tonic minor.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A Dominant 7', description: 'V7 - Dominant.' },
            { key: 'D', type: 'chord', name: 'minor-triad', title: 'D Minor', description: 'i - Tonic minor.' },
            { key: 'G', type: 'chord', name: 'minor-triad', title: 'G Minor', description: 'iv - Subdominant minor.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'VII - Subtonic Major.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'III - Relative Major.' },
            { key: 'E', type: 'chord', name: 'diminished', title: 'E Diminished', description: 'ii° - Supertonic diminished.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A Dominant 7', description: 'V7 - Leading back to tonic.' }
        ],
        'montgomery-ward': [
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'I - Tonic.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E Dominant 7', description: 'V7/vi - Secondary dominant to A minor.' },
            { key: 'A', type: 'chord', name: 'min7', title: 'A Minor 7', description: 'vi - Submediant.' },
            { key: 'D', type: 'chord', name: 'min7', title: 'D Minor 7', description: 'ii - Supertonic.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'V7 - Dominant.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'I - Tonic resolution.' }
        ],
        'ragtime-progression': [
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7', description: 'I - The tonic, starting the cycle.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'Am7', description: 'vi - Secondary dominant leading to ii.' },
            { key: 'D', type: 'chord', name: 'dom7', title: 'D7', description: 'II7 - Secondary dominant leading to V.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'V7 - The dominant, resolving to I.' }
        ],
        'flamenco-progression': [
            { key: 'D', type: 'chord', name: 'minor-triad', title: 'D Minor', description: 'i - The minor tonic.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'VII - Subtonic.' },
            { key: 'B', type: 'chord', name: 'major-triad', title: 'Bb Major', description: 'VI - Submediant.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7', description: 'V7 - The dominant, creating a powerful cadence.' }
        ],
        'cry-me-a-river': [
            { key: 'A', type: 'chord', name: 'min7', title: 'Am7', description: 'i - The tonic minor.' },
            { key: 'D', type: 'chord', name: 'min7', title: 'Dm7', description: 'iv - The subdominant minor.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'VII7 - The subtonic dominant.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7', description: 'III - The relative major.' }
        ],
        'a-day-in-the-life': [
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'I - The tonic.' },
            { key: 'B', type: 'chord', name: 'minor-triad', title: 'B Minor', description: 'iii - The mediant minor.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'IV - The subdominant.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'I - Return to the tonic.' }
        ],
        'all-the-things-you-are': [
            { key: 'F', type: 'chord', name: 'min7', title: 'Fm7', description: 'The starting chord, vi in the key of Ab.' },
            { key: 'B', type: 'chord', name: 'min7', title: 'Bbm7', description: 'The ii chord.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'Eb7', description: 'The V chord.' },
            { key: 'A', type: 'chord', name: 'maj7', title: 'Abmaj7', description: 'The I chord, a resolution.' },
            { key: 'D', type: 'chord', name: 'maj7', title: 'Dbmaj7', description: 'The IV chord.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'A V chord leading to C major.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7', description: 'A temporary tonic.' }
        ],
        'stairway-to-heaven': [
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'Am', description: 'i - The iconic opening arpeggio.' },
            { key: 'G', type: 'chord', name: 'augmented', title: 'G#aug', description: 'A passing chord with a descending bassline.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C/G', description: 'III - Relative major with G in the bass.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D/F#', description: 'IV - A major chord with F# in the bass.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7', description: 'VI - The submediant, creating a dreamy feel.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G', description: 'VII - The subtonic.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'Am', description: 'i - Returning to the tonic to complete the phrase.' }
        ],
        'heart-and-soul': [
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7', description: 'I - The tonic, with a jazzy 7th.' },
            { key: 'A', type: 'chord', name: 'min7', title: 'Am7', description: 'vi - The relative minor 7th.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7', description: 'IV - The subdominant 7th.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'V7 - The dominant 7th, leading back to C.' }
        ],
        'take-five': [
            { key: 'E', type: 'chord', name: '9', title: 'E9', description: 'The classic funk chord. Use E Dorian.' },
            { key: 'E', type: 'scale', name: 'dorian', title: 'E Dorian', description: 'Cool and sophisticated minor for funk.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7', description: 'The IV chord. A Mixolydian works well.' },
            { key: 'A', type: 'scale', name: 'mixolydian', title: 'A Mixolydian', description: 'Adds a bluesy feel to the IV chord.' },
            { key: 'E', type: 'scale', name: 'pentatonic-minor', title: 'E Minor Pentatonic', description: 'You can always fall back on the pentatonic.' }
        ],
        'jazz-standards-starter': [
            { key: 'D', type: 'chord', name: 'min7', title: 'Dm7 (ii)', description: 'The start of a ii-V-I in C Major.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7 (V)', description: 'The dominant leading to the tonic.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7 (I)', description: 'Resolution in C Major.' },
            { key: 'G', type: 'chord', name: 'min7', title: 'Gm7 (ii)', description: 'The start of a ii-V-I in F Major.' },
            { key: 'C', type: 'chord', name: 'dom7', title: 'C7 (V)', description: 'The dominant leading to F.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7 (I)', description: 'Resolution in F Major.' }
        ],
        'jazz-progressions': [
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'Common scale for the ii chord in a ii-V-I.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'Standard scale for the V chord.' },
            { key: 'C', type: 'scale', name: 'ionian', title: 'Ionian (Major)', description: 'The resolution scale for the I chord.' },
            { key: 'G', type: 'scale', name: 'altered', title: 'Altered Scale', description: 'Adds maximum tension over a V7 chord (G7alt).' },
            { key: 'C', type: 'scale', name: 'lydian', title: 'Lydian', description: 'A modern sound for the I chord (Cmaj7#11).' }
        ],
        'blues-journey': [
            { key: 'E', type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'The foundation of blues soloing.' },
            { key: 'E', type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Adds the "blue note" (b5) for more flavor.' },
            { key: 'E', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'A sweeter, more melodic sound for a major blues.' },
            { key: 'E', type: 'scale', name: 'mixolydian', title: 'Mixolydian Mode', description: 'Outlines the dominant 7th sound of a blues I chord.' },
            { key: 'E', type: 'scale', name: 'dorian', title: 'Dorian Mode', description: 'A jazzy, sophisticated sound for a minor blues.' }
        ],
        'classical-modes': [
            { key: 'C', type: 'scale', name: 'ionian', title: 'Ionian (Major)', description: '1st mode: Bright and happy. The standard major scale.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: '2nd mode: Minor with a raised 6th. Jazzy and cool.' },
            { key: 'E', type: 'scale', name: 'phrygian', title: 'Phrygian', description: '3rd mode: Minor with a lowered 2nd. Dark and Spanish-sounding.' },
            { key: 'F', type: 'scale', name: 'lydian', title: 'Lydian', description: '4th mode: Major with a raised 4th. Dreamy and magical.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: '5th mode: Major with a lowered 7th. Bluesy and dominant.' },
            { key: 'A', type: 'scale', name: 'aeolian', title: 'Aeolian (Natural Minor)', description: '6th mode: The standard natural minor scale.' },
            { key: 'B', type: 'scale', name: 'locrian', title: 'Locrian', description: '7th mode: Minor with a lowered 2nd and 5th. Tense and unstable.' }
        ],
        'rock-pop': [
            { key: 'C', type: 'scale', name: 'major', title: 'Major Scale', description: 'The foundation for most pop melodies.' },
            { key: 'A', type: 'scale', name: 'minor', title: 'Natural Minor Scale', description: 'For sadder or more dramatic songs.' },
            { key: 'C', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'A simple, foolproof scale for happy solos.' },
            { key: 'A', type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'The workhorse of rock guitar solos.' },
            { key: 'A', type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Adds a gritty, soulful edge to rock and pop.' }
        ],
        'latin-rhythms': [
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'Common in Salsa and Latin Rock.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'Used in Bossa Nova and Latin Jazz.' },
            { key: 'E', type: 'scale', name: 'phrygian-dominant', title: 'Phrygian Dominant', description: 'The characteristic sound of Flamenco and Latin music.' },
            { key: 'C', type: 'scale', name: 'major', title: 'Major Scale', description: 'The basis for many cheerful Latin pop tunes.' },
            { key: 'A', type: 'scale', name: 'minor', title: 'Natural Minor', description: 'For dramatic tangos and boleros.' }
        ],
        'celtic-scales': [
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'Very common in Irish and Scottish folk tunes.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'Another staple of Celtic music, giving a melancholic feel.' },
            { key: 'C', type: 'scale', name: 'ionian', title: 'Ionian (Major)', description: 'Used for upbeat jigs and reels.' },
            { key: 'G', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'A simple 5-note scale found in many folk traditions.' },
            { key: 'E', type: 'scale', name: 'aeolian', title: 'Aeolian (Minor)', description: 'For sad airs and laments.' }
        ],
        'eastern-scales': [
            { key: 'C', type: 'scale', name: 'hirajoshi', title: 'Hirajoshi (Japanese)', description: 'An exotic Japanese pentatonic scale.' },
            { key: 'C', type: 'scale', name: 'byzantine', title: 'Byzantine (Double Harmonic)', description: 'A scale with two augmented seconds, giving a strong Middle Eastern feel.' },
            { key: 'C', type: 'scale', name: 'persian', title: 'Persian Scale', description: 'Another dramatic and exotic Middle Eastern scale.' },
            { key: 'C', type: 'scale', name: 'chinese-pentatonic', title: 'Chinese Pentatonic', description: 'The same as the major pentatonic, central to Chinese music.' },
            { key: 'C', type: 'scale', name: 'indian-raga-bhairav', title: 'Indian Raga (Bhairav)', description: 'A morning raga with a distinct mood.' }
        ],
        'modern-jazz': [
            { key: 'G', type: 'scale', name: 'altered', title: 'Altered Scale (Super Locrian)', description: 'Creates maximum tension over a V7 chord.' },
            { key: 'F', type: 'scale', name: 'lydian-dominant', title: 'Lydian Dominant', description: 'A bright, modern sound for a non-resolving dominant chord.' },
            { key: 'C', type: 'scale', name: 'whole-tone', title: 'Whole Tone Scale', description: 'A six-note scale with a dreamy, ambiguous sound.' },
            { key: 'C', type: 'scale', name: 'diminished', title: 'Diminished (W-H)', description: 'A symmetrical scale perfect for navigating diminished chords.' },
            { key: 'C', type: 'scale', name: 'melodic-minor', title: 'Melodic Minor', description: 'The "jazz minor," a key source for modern harmony and improvisation.' }
        ],
        'folk-traditions': [
            { key: 'C', type: 'scale', name: 'major', title: 'Major (Ionian)', description: 'The basis for many Western folk songs.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'Common in Appalachian and British folk music.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'Found in Irish, Scottish, and English folk.' },
            { key: 'A', type: 'scale', name: 'minor', title: 'Natural Minor (Aeolian)', description: 'For melancholic folk ballads.' },
            { key: 'C', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'A universal scale in folk music worldwide.' }
        ],
        'bebop-essentials': [
            { key: 'C', type: 'scale', name: 'bebop-major', title: 'Bebop Major', description: 'A major scale with a passing tone for smooth 8th-note lines.' },
            { key: 'G', type: 'scale', name: 'bebop-minor', title: 'Bebop Minor', description: 'A dorian scale with a passing tone, for ii7 chords.' }
        ],
        'fusion-elements': [
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'A staple mode for fusion improvisation.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'For dominant chord vamps with a rock edge.' },
            { key: 'F', type: 'scale', name: 'lydian-dominant', title: 'Lydian Dominant', description: 'A modern, bright sound over dominant chords.' },
            { key: 'C', type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'Often used with wider intervals and chromatic passing tones.' },
            { key: 'C', type: 'scale', name: 'whole-tone', title: 'Whole Tone', description: 'For creating floating, outside-the-box textures.' }
        ],
        'gospel-soul': [
            { key: 'C', type: 'scale', name: 'major', title: 'Major Scale', description: 'The foundation for gospel harmony.' },
            { key: 'C', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'For soulful vocal melodies and instrumental fills.' },
            { key: 'A', type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Adds the essential "blue note" grit and emotion.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'Mixolydian', description: 'Used over the V chord for that classic gospel turnaround.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'A common sound for the ii chord in gospel progressions.' }
        ],
        'country-western': [
            { key: 'G', type: 'scale', name: 'major', title: 'Major Scale', description: 'The basis for most classic country songs.' },
            { key: 'G', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'The primary scale for country guitar licks.' },
            { key: 'G', type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Mixed with major pentatonic for a "hot" country sound.' }
        ],
        'mediterranean': [
            { key: 'E', type: 'scale', name: 'phrygian-dominant', title: 'Phrygian Dominant', description: 'The quintessential Spanish and Flamenco sound.' },
            { key: 'C', type: 'scale', name: 'double-harmonic-major', title: 'Double Harmonic Major', description: 'Also known as the Byzantine scale, with a strong Middle Eastern flavor.' },
            { key: 'A', type: 'scale', name: 'harmonic-minor', title: 'Harmonic Minor', description: 'Used in Greek and Eastern European folk music.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'Dorian', description: 'Common in Greek folk music.' }
        ],
        'pentatonic-world': [
            { key: 'C', type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'Found in Western, African, and East Asian music.' },
            { key: 'A', type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'The relative minor, equally widespread.' },
            { key: 'C', type: 'scale', name: 'hirajoshi', title: 'Hirajoshi', description: 'A Japanese pentatonic scale with a unique, evocative sound.' },
            { key: 'C', type: 'scale', name: 'egyptian', title: 'Egyptian', description: 'A suspended-sounding pentatonic scale.' },
            { key: 'F', type: 'scale', name: 'lydian-pentatonic', title: 'Lydian Pentatonic', description: 'A bright, open-sounding 5-note scale.' }
        ],
        'chromatic-journey': [
            { key: 'C', type: 'scale', name: 'major', title: 'Major Scale', description: 'Diatonic starting point (7 notes).' },
            { key: 'C', type: 'scale', name: 'bebop-major', title: 'Bebop Major', description: 'Adding one chromatic passing tone (8 notes).' },
            { key: 'C', type: 'scale', name: 'diminished', title: 'Diminished Scale', description: 'A symmetrical scale (8 notes).' },
            { key: 'C', type: 'scale', name: 'blues', title: 'Blues Scale', description: 'A hexatonic (6-note) scale with chromaticism.' },
            { key: 'C', type: 'scale', name: 'chromatic', title: 'Chromatic Scale', description: 'The destination: all 12 notes.' }
        ],
        'harmonic-minor-family': [
            { key: 'A', type: 'scale', name: 'harmonic-minor', title: 'Harmonic Minor', description: '1st mode: The parent scale. Minor with a major 7th.' },
            { key: 'B', type: 'scale', name: 'locrian-natural-6', title: 'Locrian Natural 6', description: '2nd mode: Dark and tense with a surprising major 6th.' },
            { key: 'C', type: 'scale', name: 'ionian-augmented', title: 'Ionian #5', description: '3rd mode: A major scale with a sharp 5th.' },
            { key: 'D', type: 'scale', name: 'ukrainian-dorian', title: 'Ukrainian Dorian', description: '4th mode: Dorian with a sharp 4th. A unique, folky sound.' },
            { key: 'E', type: 'scale', name: 'phrygian-dominant', title: 'Phrygian Dominant', description: '5th mode: The most popular mode. Spanish/metal flavor.' },
            { key: 'F', type: 'scale', name: 'lydian-sharp-2', title: 'Lydian #2', description: '6th mode: A bright Lydian sound with a sharp 2nd.' },
            { key: 'G', type: 'scale', name: 'super-locrian-bb7', title: 'Altered Dominant bb7', description: '7th mode: Extremely altered and tense.' }
        ],
        'melodic-minor-family': [
            { key: 'C', type: 'scale', name: 'melodic-minor', title: 'Melodic Minor (Jazz Minor)', description: '1st mode: Minor with a major 6th and 7th.' },
            { key: 'D', type: 'scale', name: 'dorian-b2', title: 'Dorian b2', description: '2nd mode: Dorian with a flat 2nd. A dark but smooth sound.' },
            { key: 'E', type: 'scale', name: 'lydian-augmented', title: 'Lydian Augmented', description: '3rd mode: Lydian with a sharp 5th. Very bright and spacey.' },
            { key: 'F', type: 'scale', name: 'lydian-dominant', title: 'Lydian Dominant', description: '4th mode: Mixolydian with a sharp 4th. A modern jazz staple.' },
            { key: 'G', type: 'scale', name: 'mixolydian-b6', title: 'Mixolydian b6', description: '5th mode: A dominant scale with a minor 6th. A darker dominant sound.' },
            { key: 'A', type: 'scale', name: 'locrian-natural-2', title: 'Half-Diminished', description: '6th mode: The perfect scale for min7(b5) chords.' },
            { key: 'B', type: 'scale', name: 'altered', title: 'Altered Scale (Super Locrian)', description: '7th mode: The ultimate tension scale for V7 chords.' }
        ],
        'diminished-concepts': [
            { key: 'C', type: 'scale', name: 'diminished', title: 'Diminished (W-H)', description: 'Starts with a whole step. Fits Cdim7 chords.' },
            { key: 'C', type: 'scale', name: 'half-whole-diminished', title: 'Diminished (H-W)', description: 'Starts with a half step. Fits C7(b9) chords.' },
            { key: 'C', type: 'chord', name: 'dim7', title: 'Diminished 7th Chord', description: 'A stack of minor thirds, a symmetrical chord.' },
            { key: 'C', type: 'chord', name: '7b5', title: 'Dominant 7th b5', description: 'A chord often associated with diminished sounds.' }
        ],
        'whole-tone-world': [
            { key: 'C', type: 'scale', name: 'whole-tone', title: 'Whole Tone Scale', description: 'A 6-note scale of only whole steps. Dreamy and ambiguous.' },
            { key: 'C', type: 'chord', name: 'augmented', title: 'Augmented Triad', description: 'A triad built from the whole tone scale.' },
            { key: 'C', type: 'chord', name: 'dom7', title: 'C7#5', description: 'An altered dominant chord derived from the whole tone scale.' },
            { key: 'D', type: 'scale', name: 'whole-tone', title: 'The "Other" Whole Tone Scale', description: 'There are only two unique whole tone scales. This is the other one.' }
        ],
        'blues-improvisation-toolkit': [
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7 (I)', description: 'The I chord in a blues. Use E Blues or E Mixolydian.' },
            { key: 'E', type: 'scale', name: 'blues', title: 'E Blues Scale', description: 'The classic choice over the entire progression.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7 (IV)', description: 'The IV chord. Use A Blues or A Mixolydian.' },
            { key: 'A', type: 'scale', name: 'mixolydian', title: 'A Mixolydian', description: 'Outlines the A7 chord tones perfectly.' },
            { key: 'B', type: 'chord', name: 'dom7', title: 'B7 (V)', description: 'The V chord. Use B Mixolydian or B Phrygian Dominant for tension.' },
            { key: 'B', type: 'scale', name: 'phrygian-dominant', title: 'B Phrygian Dominant', description: 'Adds a spicy, tense sound over the V chord.' }
        ],
        'modal-jazz-explorer': [
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7 (Ionian)', description: 'The Ionian chord. Bright and stable.' },
            { key: 'C', type: 'scale', name: 'ionian', title: 'C Ionian Scale', description: 'The major scale, the first mode.' },
            { key: 'D', type: 'chord', name: 'min7', title: 'Dm7 (Dorian)', description: 'The Dorian chord. Cool, jazzy minor.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'D Dorian Scale', description: 'Minor scale with a major 6th.' },
            { key: 'E', type: 'chord', name: 'min7', title: 'Em7 (Phrygian)', description: 'The Phrygian chord. Dark, Spanish flavor.' },
            { key: 'E', type: 'scale', name: 'phrygian', title: 'E Phrygian Scale', description: 'Minor scale with a flat 2nd.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7#11 (Lydian)', description: 'The Lydian chord. Bright, dreamy, and magical.' },
            { key: 'F', type: 'scale', name: 'lydian', title: 'F Lydian Scale', description: 'Major scale with a raised 4th.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7 (Mixolydian)', description: 'The Mixolydian chord. Bluesy, dominant sound.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'G Mixolydian Scale', description: 'Major scale with a flat 7th.' },
            { key: 'A', type: 'chord', name: 'min7', title: 'Am7 (Aeolian)', description: 'The vi chord. Use A Aeolian.' },
            { key: 'A', type: 'scale', name: 'aeolian', title: 'A Aeolian Scale', description: 'The natural minor scale.' },
            { key: 'B', type: 'chord', name: 'half-dim7', title: 'Bm7b5 (Locrian)', description: 'The Locrian chord. Tense and unstable.' },
            { key: 'B', type: 'scale', name: 'locrian', title: 'B Locrian Scale', description: 'The darkest mode, with a flat 2 and flat 5.' }
        ],
        'rock-riffage': [
            { key: 'E', type: 'interval', name: 'perfect-5th', title: 'E5 Power Chord', description: 'The foundation of rock guitar.' },
            { key: 'E', type: 'scale', name: 'pentatonic-minor', title: 'E Minor Pentatonic', description: 'The go-to scale for rock solos.' },
            { key: 'A', type: 'interval', name: 'perfect-5th', title: 'A5 Power Chord', description: 'Moving to the IV.' },
            { key: 'A', type: 'scale', name: 'pentatonic-minor', title: 'A Minor Pentatonic', description: 'Shift the pattern up to the IV chord root.' },
            { key: 'D', type: 'interval', name: 'perfect-5th', title: 'D5 Power Chord', description: 'The bVII chord for a classic rock sound.' },
            { key: 'E', type: 'scale', name: 'blues', title: 'E Blues Scale', description: 'Add the "blue note" for more attitude.' }
        ],
        'funk-groove': [
            { key: 'E', type: 'chord', name: '9', title: 'E9', description: 'The classic funk chord. Use E Dorian.' },
            { key: 'E', type: 'scale', name: 'dorian', title: 'E Dorian', description: 'Cool and sophisticated minor for funk.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A7', description: 'The IV chord. A Mixolydian works well.' },
            { key: 'A', type: 'scale', name: 'mixolydian', title: 'A Mixolydian', description: 'Adds a bluesy feel to the IV chord.' },
            { key: 'E', type: 'scale', name: 'pentatonic-minor', title: 'E Minor Pentatonic', description: 'You can always fall back on the pentatonic.' }
        ],
        'neo-soul-flavors': [
            { key: 'C', type: 'chord', name: 'maj9', title: 'Cmaj9', description: 'Lush and dreamy. C Ionian or Lydian.' },
            { key: 'C', type: 'scale', name: 'lydian', title: 'C Lydian', description: 'The #4 adds a beautiful, floaty quality.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7', description: 'The IV chord. Simple and elegant.' },
            { key: 'F', type: 'scale', name: 'ionian', title: 'F Ionian', description: 'Standard major scale over the IV.' },
            { key: 'E', type: 'chord', name: 'm9', title: 'Em9', description: 'The iii chord. Sophisticated and smooth.' },
            { key: 'E', type: 'scale', name: 'phrygian', title: 'E Phrygian', description: 'The b2 adds a touch of modern tension.' }
        ],
        'folk-acoustic-strummer': [
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The I chord. Strum with G Major scale melodies.' },
            { key: 'G', type: 'scale', name: 'major', title: 'G Major Scale', description: 'The happy, bright foundation.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The IV chord. Cheerful and uplifting.' },
            { key: 'G', type: 'scale', name: 'pentatonic-major', title: 'G Major Pentatonic', description: 'A simple, sweet scale for fills.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The V chord, leading back home.' },
            { key: 'D', type: 'scale', name: 'mixolydian', title: 'D Mixolydian', description: 'Use the V chord\'s own scale for color.' }
        ],
        'metal-mayhem': [
            { key: 'E', type: 'interval', name: 'perfect-5th', title: 'E5 Power Chord', description: 'Tuned down low. Use E Phrygian or Harmonic Minor.' },
            { key: 'E', type: 'scale', name: 'phrygian', title: 'E Phrygian', description: 'The b2 gives a dark, heavy sound.' },
            { key: 'F', type: 'interval', name: 'tritone', title: 'F Tritone', description: 'The devil\'s interval from the bII chord.' },
            { key: 'E', type: 'scale', name: 'harmonic-minor', title: 'E Harmonic Minor', description: 'Exotic and neoclassical metal flavor.' },
            { key: 'B', type: 'chord', name: 'diminished', title: 'B Diminished', description: 'The v-diminished chord for extreme tension.' },
            { key: 'B', type: 'scale', name: 'phrygian-dominant', title: 'B Phrygian Dominant', description: 'The 5th mode of E Harmonic Minor.' }
        ],
        'bossa-nova-moods': [
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7', description: 'The I chord. Keep it relaxed with C Ionian.' },
            { key: 'C', type: 'scale', name: 'major', title: 'C Ionian', description: 'Gentle melodies over the tonic.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7', description: 'The IV chord. Use F Lydian for a brighter sound.' },
            { key: 'F', type: 'scale', name: 'lydian', title: 'F Lydian', description: 'The #11 adds sophistication.' },
            { key: 'D', type: 'chord', name: 'min7', title: 'Dm7', description: 'The ii chord. Dorian is a smooth choice.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'D Dorian Scale', description: 'Minor scale with a major 6th.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'The V chord. Classic Mixolydian.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'G Mixolydian Scale', description: 'Major scale with a flat 7th.' }
        ],
        'country-twang': [
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'The I chord. A Major Pentatonic is your best friend.' },
            { key: 'A', type: 'scale', name: 'pentatonic-major', title: 'A Major Pentatonic', description: 'Perfect for classic country licks.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The IV chord. You can stick with A Major Pentatonic or switch.' },
            { key: 'A', type: 'scale', name: 'blues', title: 'A Blues Scale', description: 'Add the b3 for a bluesy country feel.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'The V chord. Target the chord tones.' },
            { key: 'E', type: 'scale', name: 'mixolydian', title: 'E Mixolydian', description: 'The perfect scale to outline the V7 sound.' }
        ],
        'ambient-textural': [
            { key: 'D', type: 'chord', name: 'sus2', title: 'Dsus2', description: 'Open and spacious. Use D Ionian or Lydian.' },
            { key: 'D', type: 'scale', name: 'lydian', title: 'D Lydian', description: 'Creates a floating, ethereal texture.' },
            { key: 'G', type: 'chord', name: 'maj7', title: 'Gmaj7', description: 'A warm, gentle chord.' },
            { key: 'G', type: 'scale', name: 'lydian', title: 'G Lydian', description: 'Continue the bright, open sound.' },
            { key: 'A', type: 'chord', name: 'sus4', title: 'Asus4', description: 'A resolving or non-resolving suspension.' },
            { key: 'A', type: 'scale', name: 'mixolydian', title: 'A Mixolydian', description: 'Provides a soft landing or a gentle drive.' }
        ],
        'bebop-language': [
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7', description: 'The I chord. Use the F Bebop Major scale.' },
            { key: 'F', type: 'scale', name: 'bebop-major', title: 'F Bebop Major', description: 'Adds a passing tone for smooth 8th note lines.' },
            { key: 'C', type: 'chord', name: 'dom7', title: 'C7', description: 'The V chord. Use C Bebop Dominant.' },
            { key: 'C', type: 'scale', name: 'bebop-dominant', title: 'C Bebop Dominant', description: 'The classic scale for V7 chords in bebop.' },
            { key: 'G', type: 'chord', name: 'min7', title: 'Gm7', description: 'The ii chord. Use G Dorian or Bebop Minor.' },
            { key: 'G', type: 'scale', name: 'bebop-minor', title: 'G Bebop Minor', description: 'Adds a passing tone to the dorian mode.' }
        ]
    };

    let currentSlideshow = null;
    let slideshowTimer = null;
    let currentSlideIndex = 0;
    let isPlaying = false;

    // Slideshow countdown variables
    let currentBeat = 0;

    // Slideshow controls

    function updateSlideshowSpeedDisplay() {
        const speed = parseFloat(slideshowBpm.value);
        slideshowBpm.textContent = `${speed}s`;
    }

    function playSlideshow() {
        if (!slideshowSelect.value) return;

        const transposeValue = parseInt(slideshowTranspose.value, 10);
        const originalSlideshow = SLIDESHOWS[slideshowSelect.value];

        // Add a check to ensure the slideshow exists and is an array
        if (!originalSlideshow || !Array.isArray(originalSlideshow)) {
            console.error("Slideshow data not found or is not an array for:", slideshowSelect.value);
            alert("This slideshow is not yet implemented.");
            return;
        }
        
        if (transposeValue > 0 && transposeValue < 12) {
            currentSlideshow = originalSlideshow.map(slide => ({
                ...slide,
                key: transposeNote(slide.key, transposeValue)
            }));
        } else {
            currentSlideshow = [...originalSlideshow]; // Make a copy to avoid modifying original
        }

        isPlaying = true;
        slideshowPlay.disabled = true;
        slideshowStop.disabled = false;
        
        currentSlideIndex = 0;
        currentBeat = 0; // Start at beat 0, will be updated to 1 on first tick.
        
        showCurrentSlide(); // Show the first slide immediately
        startBeatTimer();
    }

    function startBeatTimer() {
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
        }

        const bpm = parseInt(slideshowBpm.value, 10) || 120;
        const beatDurationMs = 60000 / bpm;

        slideshowTimer = setInterval(() => {
            if (!isPlaying) return;

            currentBeat++;

            const currentSlide = currentSlideshow ? currentSlideshow[currentSlideIndex] : null;
            // Use per-slide measures if available, otherwise use global setting
            const measuresPerSlide = (currentSlide && currentSlide.measures) 
                ? parseInt(currentSlide.measures, 10) 
                : 2; // Default to 2 measures if not specified

            const beatsPerMeasure = 4; // Assuming 4/4 time
            const totalBeatsPerSlide = measuresPerSlide * beatsPerMeasure;
            
            if (currentBeat > totalBeatsPerSlide) {
                currentBeat = 1; // Reset for the new slide
                currentSlideIndex = (currentSlideIndex + 1) % currentSlideshow.length;
                showCurrentSlide();
            }
            
            updateBeatDisplay();

        }, beatDurationMs);
    }
    
    function updateBeatDisplay() {
        if (!isPlaying || !currentSlideshow) {
            slideshowTimeRemaining.textContent = '';
            return;
        }

        const currentSlide = currentSlideshow ? currentSlideshow[currentSlideIndex] : null;
        // Use per-slide measures if available, otherwise use global setting
        const measuresPerSlide = (currentSlide && currentSlide.measures)
            ? parseInt(currentSlide.measures, 10)
            : 2; // Default to 2 measures if not specified

        const beatsPerMeasure = 4;
        
        const measure = Math.floor((currentBeat - 1) / beatsPerMeasure) + 1;
        const beatInMeasure = ((currentBeat - 1) % beatsPerMeasure) + 1;
        
        slideshowTimeRemaining.textContent = `Measure: ${measure}/${measuresPerSlide} | Beat: ${beatInMeasure}`;
    }


    function pauseSlideshow() {
        isPlaying = false;
        slideshowPlay.disabled = false;
        
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
            slideshowTimer = null;
        }
    }

    function stopSlideshow() {
        pauseSlideshow(); // Clears timers
        
        isPlaying = false;
        slideshowPlay.disabled = false;
        slideshowStop.disabled = true;
        
        currentSlideIndex = 0;
        currentBeat = 0;
        currentSlideshow = null;
        
        // Reset display
        slideshowTimeRemaining.textContent = ''; // Clear countdown display
        if (slideshowItemDescription) slideshowItemDescription.textContent = ''; // Clear description
        
        // Clear all visible notes
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => note.classList.remove('visible'));
        
        // Update selection display
        updateCurrentSelectionDisplay();
    }

    function previousSlide() {
        // Not exposed in UI after removing detailed section, but keeping for completeness
        if (!currentSlideshow) return;
        
        currentSlideIndex = (currentSlideIndex - 1 + currentSlideshow.length) % currentSlideshow.length;
        currentBeat = 1;
        showCurrentSlide();
        if (isPlaying) {
            startBeatTimer(); // Restart timer to sync with new slide
        }
    }

    function nextSlide() {
        // Not exposed in UI after removing detailed section, but keeping for completeness
        if (!currentSlideshow) return;
        
        currentSlideIndex = (currentSlideIndex + 1) % currentSlideshow.length;
        currentBeat = 1;
        showCurrentSlide();
        if (isPlaying) {
            startBeatTimer(); // Restart timer to sync with new slide
        }
    }

    function showCurrentSlide() {
        if (!currentSlideshow) return;
        
        // Clear all visible notes before showing new slide
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => note.classList.remove('visible'));
        
        const slide = currentSlideshow[currentSlideIndex];
        
        // Use the slide's key if it exists, otherwise fallback to the global key selector
        const selectedKey = slide.key || keySelect.value;

        // Update main key select to reflect current slide's key. This keeps UI consistent.
        if (slide.key) {
            keySelect.value = slide.key;
        }
        
        // Update scale/chord selection
        scaleSelect.value = slide.name;
        
        // Update current selection display
        updateCurrentSelectionDisplay();
        
        // Update fretboard
        updateNoteClasses();

        // Update the description display
        if (slideshowItemDescription) {
            slideshowItemDescription.textContent = slide.description || '';
        }
        
        // Show all scale notes if toggle is enabled
        if (toggleAllNotes.checked) {
            toggleAllNotes.dispatchEvent(new Event('change'));
        }

        // Update current selection display
        updateCurrentSelectionDisplay();
        
        // Update beat display if paused or just starting
        if (!isPlaying || currentBeat <= 1) {
            updateBeatDisplay();
        }
    }

    // Event listeners for slideshow controls
    slideshowPlay.addEventListener('click', playSlideshow);
    slideshowStop.addEventListener('click', stopSlideshow);

    slideshowSelect.addEventListener('change', () => {
        if (isPlaying) {
            stopSlideshow();
        }
        updateBaseKeyDisplay();
    });

    function updateBaseKeyDisplay() {
        const selectedSlideshow = slideshowSelect.value;
        if (selectedSlideshow && SLIDESHOWS[selectedSlideshow] && SLIDESHOWS[selectedSlideshow].length > 0) {
            const firstKey = SLIDESHOWS[selectedSlideshow][0].key;
            slideshowBaseKey.value = firstKey;
        } else {
            slideshowBaseKey.value = 'N/A';
        }
    }

    // Stop slideshow if timing or transpose value is changed
    [slideshowBpm, slideshowTranspose].forEach(input => {
        input.addEventListener('change', () => {
            if (isPlaying) {
                stopSlideshow();
                alert("Slideshow stopped due to settings change. Press Play to restart.");
            }
        });
    });

    // Initialize slideshow controls
    slideshowStop.disabled = true;
    slideshowTimeRemaining.textContent = ''; // Initially empty
    updateBaseKeyDisplay(); // Call on load

    // --- Quiz Logic ---
    function startQuiz() {
        isQuizActive = true;
        currentQuizType = quizTypeSelect.value;
        quizContainer.classList.remove('hidden');
        
        // Hide regular note display options to avoid giving away answers
        toggleAllNotes.checked = false;
        toggleAllNotes.dispatchEvent(new Event('change'));
        toggleAllNotes.disabled = true;

        generateNewQuestion();
    }

    function stopQuiz() {
        location.reload(); // Simple way to reset state
    }

    function generateNewQuestion() {
        quizFeedback.textContent = '';
        quizFeedback.className = '';
        quizOptions.innerHTML = '';
        nextQuestionBtn.classList.add('hidden');

        // Clear all visible notes
        fretboard.querySelectorAll('.note').forEach(n => n.classList.remove('visible'));

        const selectedKey = keySelect.value;
        const selectedScaleName = scaleSelect.value;
        const scaleNotes = getScaleNotes(selectedKey, selectedScaleName);
        const scaleIntervals = SCALES[selectedScaleName];

        if (scaleNotes.length < 2) {
            quizQuestion.textContent = 'Please select a scale with at least 2 notes.';
            return;
        }

        // 1. Pick a random note from the scale
        const randomNoteIndex = Math.floor(Math.random() * scaleNotes.length);
        const targetNoteName = scaleNotes[randomNoteIndex];
        const targetIntervalValue = scaleIntervals[randomNoteIndex];
        const intervalNames = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
        const targetIntervalName = intervalNames[targetIntervalValue];

        // 2. Find all occurrences of that note on the fretboard
        const allOccurrences = Array.from(fretboard.querySelectorAll(`.note[data-note="${targetNoteName}"]`));
        if (allOccurrences.length === 0) {
            // Fret range might be too small, try again.
            generateNewQuestion();
            return;
        }

        // 3. Pick one occurrence and show it
        const questionNoteElement = allOccurrences[Math.floor(Math.random() * allOccurrences.length)];
        questionNoteElement.classList.add('visible', 'in-scale');
        if (targetNoteName === selectedKey) {
            questionNoteElement.classList.add('root');
        }

        // 4. Generate question and answers
        let questionText, correctAnswer, options;
        if (currentQuizType === 'note-name') {
            questionText = `This note is the "${targetIntervalName}" of ${getEnharmonicDisplay(selectedKey)}. What note is it?`;
            questionNoteElement.textContent = targetIntervalName; // Show interval on the note
            correctAnswer = getEnharmonicDisplay(targetNoteName);
            const allPossibleDisplayNotes = CHROMATIC_SCALE.map(n => getEnharmonicDisplay(n));
            options = generateOptions(correctAnswer, allPossibleDisplayNotes);
        } else { // 'interval'
            questionText = `This note is "${getEnharmonicDisplay(targetNoteName)}". What is its interval in the ${getEnharmonicDisplay(selectedKey)} ${selectedScaleName.replace(/-/g, ' ')} scale?`;
            questionNoteElement.textContent = getEnharmonicDisplay(targetNoteName); // Show note name on the note
            correctAnswer = targetIntervalName;
            const allIntervalNames = scaleIntervals.map(i => intervalNames[i]);
            options = generateOptions(correctAnswer, allIntervalNames);
        }

        quizQuestion.textContent = questionText;
        currentQuestionData = { correctAnswer };

        // 5. Create answer buttons
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(btn));
            quizOptions.appendChild(btn);
        });
    }

    function generateOptions(correctAnswer, allPossibleAnswers) {
        const options = new Set([correctAnswer]);
        const filteredAnswers = allPossibleAnswers.filter(ans => ans !== correctAnswer);
        
        while (options.size < 4 && filteredAnswers.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredAnswers.length);
            options.add(filteredAnswers.splice(randomIndex, 1)[0]);
        }

        return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle options
    }

    function checkAnswer(selectedButton) {
        const isCorrect = selectedButton.textContent === currentQuestionData.correctAnswer;
        
        // Disable all buttons
        quizOptions.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.disabled = true;
            // Highlight the correct answer
            if (btn.textContent === currentQuestionData.correctAnswer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            quizFeedback.textContent = 'Correct!';
            quizFeedback.className = 'correct';
        } else {
            selectedButton.classList.add('incorrect');
            quizFeedback.textContent = `Incorrect. The answer is ${currentQuestionData.correctAnswer}.`;
            quizFeedback.className = 'incorrect';
        }

        nextQuestionBtn.classList.remove('hidden');
    }

    quizTypeSelect.addEventListener('change', () => {
        if (quizTypeSelect.value === 'none') {
            stopQuiz();
        } else {
            startQuiz();
        }
    });

    nextQuestionBtn.addEventListener('click', generateNewQuestion);

    stopQuizBtn.addEventListener('click', () => {
        quizTypeSelect.value = 'none';
        stopQuiz();
    });

    // Helper functions
    function getNoteName(stringIndex, fretNumber) {
        const openStringNote = TUNING[stringIndex];
        const openStringIndex = CHROMATIC_SCALE.indexOf(openStringNote);
        const noteIndex = (openStringIndex + fretNumber) % 12;
        return CHROMATIC_SCALE[noteIndex];
    }

    function transposeNote(noteName, semitones) {
        const index = CHROMATIC_SCALE.indexOf(noteName);
        if (index === -1) return noteName;
        const newIndex = (index + semitones) % 12;
        return CHROMATIC_SCALE[newIndex];
    }

    function getScaleNotes(key, scaleName, preferFlat = false) {
        if (!SCALES[scaleName]) return [];
        
        const referenceScale = preferFlat ? CHROMATIC_SCALE_FLATS : CHROMATIC_SCALE_SHARPS;
        let keyIndex = referenceScale.indexOf(key);

        if (keyIndex === -1) {
            // If key isn't in the preferred scale, find its equivalent
            const equivalentKey = ENHARMONIC_MAP[key] || key;
            keyIndex = referenceScale.indexOf(equivalentKey);
        }

        if (keyIndex === -1) {
            // Fallback to sharp scale if still not found
            keyIndex = CHROMATIC_SCALE_SHARPS.indexOf(key);
            if (keyIndex === -1) return []; // Should not happen with valid keys
        }
        
        const scaleIntervals = SCALES[scaleName];
        return scaleIntervals.map(interval => {
            const noteIndex = (keyIndex + interval) % 12;
            return referenceScale[noteIndex];
        });
    }

    function updateNoteClasses() {
        const selectedScale = scaleSelect.value;
        const selectedKey = keySelect.value;
        const scaleNotes = getScaleNotes(selectedKey, selectedScale);
        
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => {
            const noteName = note.dataset.note;
            
            // Remove existing classes
            note.classList.remove('in-scale', 'root');
            
            if (selectedScale === 'chromatic' || (document.body.className.includes('preset-chromatic-') && !document.body.className.includes('root'))) {
                note.classList.add('in-scale');
            } else if (scaleNotes.includes(noteName)) {
                note.classList.add('in-scale');
            }
            
            // Mark root notes
            if (noteName === selectedKey) {
                note.classList.add('root');
            }

            // During quiz, only the question note should be visible
            if (isQuizActive && !note.classList.contains('visible')) {
                note.classList.remove('in-scale', 'root');
            }
        });
    }

    // --- Dynamic Sizing ---
    const fretboardWidth = fretboard.offsetWidth;
    const NUT_WIDTH_PX = 18; 
    const effectiveFretboardWidth = fretboardWidth - NUT_WIDTH_PX;

    // --- Create Frets ---
    const nut = document.createElement('div');
    nut.className = 'nut';
    fretboard.appendChild(nut);

    function displayFretNumbers() {
        fretNumbersDisplay.innerHTML = ''; // Clear existing numbers
    
        const fretboardOffsetWidth = fretboard.offsetWidth;
        const NUT_WIDTH_PX = 18;
        const effectiveFretboardWidth = fretboardOffsetWidth - NUT_WIDTH_PX;
    
        const fretsToShowNumbers = [3, 5, 7, 9, 12, 15];
    
        fretsToShowNumbers.forEach(fretNum => {
            const label = document.createElement('div');
            label.className = 'fret-number-label';
            label.textContent = fretNum;
    
            // Position the label in the middle of the fret space
            const leftPos = ((fretNum - 0.5) / NUM_FRETS) * effectiveFretboardWidth;
            label.style.left = `${leftPos}px`;
            
            fretNumbersDisplay.appendChild(label);
        });
    }

    for (let i = 1; i <= NUM_FRETS; i++) {
        const fret = document.createElement('div');
        fret.className = 'fret';
        // Position the center of the fret bar at the end of the i-th fret space.
        // The translateX(-50%) in CSS will center it correctly.
        fret.style.left = `${NUT_WIDTH_PX + (i * (effectiveFretboardWidth / NUM_FRETS))}px`;
        fretboard.appendChild(fret);
    }
    
    displayFretNumbers();

    // --- Create Inlays ---
    const inlayFrets = [3, 5, 7, 9, 12, 15];
    inlayFrets.forEach(fretNum => {
        const inlay = document.createElement('div');
        inlay.className = 'inlay';
        const leftPos = NUT_WIDTH_PX + ((fretNum - 0.5) / NUM_FRETS) * effectiveFretboardWidth;
        inlay.style.left = `${leftPos}px`;

        if (fretNum === 12) {
             const inlay2 = document.createElement('div');
             inlay.classList.add('double');
             inlay2.classList.add('inlay', 'double');
             inlay.style.top = `calc(var(--fretboard-height) / 4)`;
             inlay2.style.left = inlay.style.left;
             inlay2.style.top = `calc(var(--fretboard-height) * 3 / 4)`;
             fretboard.appendChild(inlay2);
        } else {
            inlay.style.top = `50%`;
            inlay.style.transform = 'translate(-50%, -50%)';
        }
        fretboard.appendChild(inlay);
    });

    function getStringFretRange(stringIndex) {
        const startInput = document.querySelector(`.start-fret[data-string="${stringIndex}"]`);
        const endInput = document.querySelector(`.end-fret[data-string="${stringIndex}"]`);
        return {
            start: parseInt(startInput.value),
            end: parseInt(endInput.value)
        };
    }
    
    function getCurrentTuning() {
        const tuningSelects = document.querySelectorAll('.tuning-select');
        return Array.from(tuningSelects).map(select => select.value);
    }

    function getNoteDisplay(stringIndex, fretNumber, selectedKey, displayType) {
        const noteName = getNoteName(stringIndex, fretNumber);
        
        switch (displayType) {
            case 'intervals':
                const keyIndex = CHROMATIC_SCALE.indexOf(selectedKey);
                const noteIndex = CHROMATIC_SCALE.indexOf(noteName);
                const interval = (noteIndex - keyIndex + 12) % 12;
                const intervalNames = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
                return intervalNames[interval];
            
            case 'solfege':
                const keyIndexSol = CHROMATIC_SCALE.indexOf(selectedKey);
                const noteIndexSol = CHROMATIC_SCALE.indexOf(noteName);
                const intervalSol = (noteIndexSol - keyIndexSol + 12) % 12;
                return SOLFEGE_CHROMATIC[intervalSol];
            
            case 'note-names-sharp':
                // Our internal representation is sharp-based, so just return it.
                return noteName;
            
            case 'note-names-flat':
                // Return the flat equivalent if it exists, otherwise the natural note.
                return ENHARMONIC_MAP[noteName] || noteName;

            default: // 'note-names' (mixed)
                return getEnharmonicDisplay(noteName);
        }
    }

    function rebuildFretboard() {
        // Update tuning from selects
        TUNING = getCurrentTuning();
        
        // Clear existing notes
        const existingNotes = fretboard.querySelectorAll('.note');
        existingNotes.forEach(note => note.remove());
        
        const selectedKey = keySelect.value;
        const displayType = noteDisplayType.value;
        const currentNoteShape = noteShapeSelect.value; 

        const fretboardOffsetWidth = fretboard.offsetWidth; 
        const currentEffectiveFretboardWidth = fretboardOffsetWidth - NUT_WIDTH_PX;

        // Create new notes based on fret ranges
        for (let i = 0; i < TUNING.length; i++) {
            const range = getStringFretRange(i);
            
            for (let j = range.start; j <= range.end; j++) {
                const note = document.createElement('div');
                note.className = 'note';
                note.dataset.note = getNoteName(i, j);
                note.dataset.stringIndex = i;
                note.dataset.fretNumber = j;
                note.textContent = getNoteDisplay(i, j, selectedKey, displayType);
                note.classList.add(`shape-${currentNoteShape}`); 
                
                let leftPos;
                if (j === 0) { 
                    leftPos = NUT_WIDTH_PX / 2;
                } else { 
                    leftPos = NUT_WIDTH_PX + ((j - 0.5) * (currentEffectiveFretboardWidth / NUM_FRETS));
                }
                
                note.style.left = `${leftPos}px`;
                note.style.top = `calc(${((i + 0.5) / TUNING.length) * 100}% - ${1.5 + i * 0.5 / 2}px)`;

                note.addEventListener('click', (e) => {
                    e.stopPropagation();
                    note.classList.toggle('visible');
                });
                fretboard.appendChild(note);
            }
        }
        
        updateNoteClasses();
        if (toggleAllNotes.checked) {
            toggleAllNotes.dispatchEvent(new Event('change'));
        }
    }

    // --- Create Strings and Notes ---
    rebuildStrings();
    
    // Initial note creation
    rebuildFretboard();

    // --- Controls ---
    toggleAllNotes.addEventListener('change', (e) => {
        const selectedScale = scaleSelect.value;
        const selectedKey = keySelect.value;
        const scaleNotes = getScaleNotes(selectedKey, selectedScale);
        
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => {
            const noteName = note.dataset.note;
            
            // Remove existing classes
            note.classList.remove('in-scale', 'root');
            
            if (selectedScale === 'chromatic' || (document.body.className.includes('preset-chromatic-') && !document.body.className.includes('root'))) {
                note.classList.add('in-scale');
            } else if (scaleNotes.includes(noteName)) {
                note.classList.add('in-scale');
            }
            
            // Mark root notes
            if (noteName === selectedKey) {
                note.classList.add('root');
            }

            // During quiz, only the question note should be visible
            if (isQuizActive && !note.classList.contains('visible')) {
                note.classList.remove('in-scale', 'root');
            }
            
            if (e.target.checked && scaleNotes.includes(noteName)) {
                note.classList.add('visible');
            } else if (!e.target.checked) {
                // Don't hide the quiz question note
                if (!isQuizActive || (isQuizActive && !nextQuestionBtn.classList.contains('hidden'))) {
                    note.classList.remove('visible');
                }
            }
        });
    });

    noteDisplayType.addEventListener('change', () => {
        updateNoteDisplay();
    });

    keySelect.addEventListener('change', () => {
        if (isQuizActive) {
            generateNewQuestion();
        } else {
            // Clear all visible notes when key changes, similar to scale change
            const notes = fretboard.querySelectorAll('.note');
            notes.forEach(note => note.classList.remove('visible'));

            updateNoteClasses();
            updateNoteDisplay();
            updateCurrentSelectionDisplay(); 
            if (toggleAllNotes.checked) {
                toggleAllNotes.dispatchEvent(new Event('change'));
            }
        }
    });

    scaleSelect.addEventListener('change', () => {
        if (isQuizActive) {
            generateNewQuestion();
        } else {
            // Clear all visible notes when scale changes
            const notes = fretboard.querySelectorAll('.note');
            notes.forEach(note => note.classList.remove('visible'));
            
            updateNoteClasses();
            updateCurrentSelectionDisplay(); 
            if (toggleAllNotes.checked) {
                toggleAllNotes.dispatchEvent(new Event('change'));
            }
        }
    });

    function updateNoteDisplay() {
        const selectedKey = keySelect.value;
        const displayType = noteDisplayType.value;
        
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => {
            const stringIndex = parseInt(note.dataset.stringIndex);
            const fretNumber = parseInt(note.dataset.fretNumber);
            
            // Don't update the text of the quiz note while an answer is shown
            if (isQuizActive && quizFeedback.textContent !== '') {
                return;
            }

            note.textContent = getNoteDisplay(stringIndex, fretNumber, selectedKey, displayType);
        });
    }

    // Add event listeners for fret range controls
    const fretRangeInputs = document.querySelectorAll('.start-fret, .end-fret');
    fretRangeInputs.forEach(input => {
        input.addEventListener('change', () => {
            const stringIndex = parseInt(input.dataset.string);
            const startInput = document.querySelector(`.start-fret[data-string="${stringIndex}"]`);
            const endInput = document.querySelector(`.end-fret[data-string="${stringIndex}"]`);
            
            // Ensure start <= end
            if (parseInt(startInput.value) > parseInt(endInput.value)) {
                if (input.classList.contains('start-fret')) {
                    endInput.value = startInput.value;
                } else {
                    startInput.value = endInput.value;
                }
            }
            
            rebuildFretboard();
        });
    });

    // --- Fretboard View Preset Logic ---
    fretboardViewSelect.addEventListener('change', (e) => {
        const view = e.target.value;
        const startFrets = document.querySelectorAll('.start-fret');
        const endFrets = document.querySelectorAll('.end-fret');

        const setAllFretRanges = (start, end) => {
            startFrets.forEach(input => input.value = start);
            endFrets.forEach(input => input.value = end);
        };
        
        const setStringFretRange = (stringIndex, start, end) => {
            const startInput = document.querySelector(`.start-fret[data-string="${stringIndex}"]`);
            const endInput = document.querySelector(`.end-fret[data-string="${stringIndex}"]`);
            if (startInput && endInput) {
                startInput.value = start;
                endInput.value = end;
            }
        };

        // Reset all to a "hidden" state before applying the view
        // A start > end range will cause no notes to be rendered for that string
        setAllFretRanges(1, 0);

        if (view === 'full-fretboard') {
            setAllFretRanges(0, 15);
        } else if (view.startsWith('frets-')) {
            const [start, end] = view.replace('frets-', '').split('-').map(Number);
            setAllFretRanges(start, end);
        } else if (view.startsWith('string-')) {
            const stringNum = parseInt(view.replace('string-', ''), 10);
            // String 6 is index 5, String 1 is index 0
            const stringIndex = 6 - stringNum;
            setStringFretRange(stringIndex, 0, 15);
        } else if (view.startsWith('strings-')) {
            const stringNums = view.replace('strings-', '').split('').map(Number);
            stringNums.forEach(stringNum => {
                const stringIndex = 6 - stringNum;
                setStringFretRange(stringIndex, 0, 15);
            });
        }

        rebuildFretboard();
    });

    // Add event listeners for tuning changes
    const tuningSelects = document.querySelectorAll('.tuning-select');
    tuningSelects.forEach(select => {
        select.addEventListener('change', () => {
            rebuildFretboard();
        });
    });

    // Add collapsible functionality
    const fretRangeHeader = document.getElementById('fret-range-header');
    const fretRangeContent = document.getElementById('fret-range-content');
    const collapseIcon = fretRangeHeader.querySelector('.collapse-icon');

    fretRangeHeader.addEventListener('click', () => {
        fretRangeContent.classList.toggle('collapsed');
        collapseIcon.classList.toggle('rotated');
    });

    // Add event listener for fretboard background selection
    fretboardSelect.addEventListener('change', (e) => {
        fretboard.style.backgroundImage = `url('${e.target.value}')`;
    });

    function rebuildStrings() {
        // Clear existing strings
        fretboard.querySelectorAll('.string').forEach(s => s.remove());

        // Re-create strings based on current TUNING
        const baseWidth = parseFloat(stringWidthSlider.value);
        for (let i = 0; i < TUNING.length; i++) {
            const string = document.createElement('div');
            string.className = 'string';
            const stringThickness = baseWidth + i * (baseWidth * 0.3); // Thicker for lower strings
            string.style.height = `${stringThickness}px`;
            string.style.top = `calc(${((i + 0.5) / TUNING.length) * 100}% - ${stringThickness / 2}px)`;
            fretboard.appendChild(string);
        }
    }

    function updateStringWidths() {
        const baseWidth = parseFloat(stringWidthSlider.value);
        document.documentElement.style.setProperty('--string-base-width', `${baseWidth}px`);
        stringWidthValue.textContent = `${baseWidth}px`;
        rebuildStrings();
    }

    function updateFretWidth() {
        const fretWidth = parseInt(fretWidthSlider.value);
        document.documentElement.style.setProperty('--fret-width', `${fretWidth}px`);
        fretWidthValue.textContent = `${fretWidth}px`;
        
        // No longer need to update individual fret style.width if done via CSS variable.
        // The fret positioning now relies on CSS variable for its own width.
    }

    function updateNoteColorPreset() {
        // Remove all existing preset classes
        document.body.classList.forEach(cls => {
            if (cls.startsWith('preset-chromatic-') || cls.startsWith('preset-mono-') || cls.startsWith('preset-')) {
                document.body.classList.remove(cls);
            }
        });
        
        // Reset to default colors for direct CSS variables
        document.documentElement.style.setProperty('--note-default-color', 'rgba(23, 162, 184, 0.9)');
        document.documentElement.style.setProperty('--note-in-scale-color', 'rgba(40, 167, 69, 0.9)');
        document.documentElement.style.setProperty('--note-root-color', 'rgba(220, 53, 69, 0.9)');

        // Handle color presets
        if (noteColorPreset.value !== 'default') {
            // Add preset class for built-in themes
            document.body.classList.add(`preset-${noteColorPreset.value}`);
        }
    }

    function updateInlayColor() {
        const inlayColor = inlayColorInput.value;
        document.documentElement.style.setProperty('--inlay-color', inlayColor + '50'); 
        document.documentElement.style.setProperty('--inlay-border-color', inlayColor + '10'); 
    }

    function updateFretColor() {
        const fretColor = fretColorInput.value;
        document.documentElement.style.setProperty('--fret-color', fretColor);
    }

    function updateStringColor() {
        const stringColor = stringColorInput.value;
        document.documentElement.style.setProperty('--string-color', stringColor);
    }
    
    // New function to update note font color
    function updateNoteFontColor() {
        const fontColor = noteFontColorInput.value;
        document.documentElement.style.setProperty('--note-font-color', fontColor);
    }

    function updateNoteFont() {
        const font = noteFontSelect.value;
        document.documentElement.style.setProperty('--note-font-family', font);
    }

    function updateNoteSize() {
        const noteSize = parseInt(noteSizeSlider.value);
        document.documentElement.style.setProperty('--note-size', `${noteSize}px`);
        noteSizeValue.textContent = `${noteSize}px`;
    }

    // Set default note display
    noteDisplayType.value = 'intervals';
    updateNoteDisplay();

    function updateTuningControls() {
        const fretRangeContentDiv = document.getElementById('fret-range-content');
        const stringControlsContainer = fretRangeContentDiv.querySelector('.string-controls');
        stringControlsContainer.innerHTML = ''; // Clear existing controls
        const numStrings = TUNING.length;

        TUNING.slice().reverse().forEach((note, index) => {
            const originalIndex = TUNING.length - 1 - index;
            const stringControlDiv = document.createElement('div');
            stringControlDiv.className = 'string-control';
            stringControlDiv.dataset.string = originalIndex;

            const label = document.createElement('label');
             // Dynamic labels based on instrument type
            const presetKey = instrumentSelect.value;
            let stringNames = [];
            if (presetKey.includes('guitar')) {
                 stringNames = ['Low E', 'A', 'D', 'G', 'B', 'High E', 'Low B'];
                 if (presetKey.includes('7')) {
                     label.textContent = `${stringNames[index]} (${note}):`;
                 } else {
                     label.textContent = `${stringNames[index]} (${note}):`;
                 }
            } else if (presetKey.includes('bass')) {
                stringNames = ['Low B', 'E', 'A', 'D', 'G'];
                if (presetKey.includes('5')) {
                    label.textContent = `${stringNames[index]} (${note}):`;
                } else {
                    label.textContent = `${stringNames[index + 1]} (${note}):`;
                }
            } else if (presetKey.includes('ukulele')) {
                stringNames = ['G', 'C', 'E', 'A'];
                label.textContent = `String ${stringNames[index]} (${note}):`;
            }
             else { // Default to string numbers
                 label.textContent = `String ${TUNING.length - index} (${note}):`;
            }

            const tuningSelect = document.createElement('select');
            tuningSelect.className = 'tuning-select';
            tuningSelect.dataset.string = originalIndex;
            ALL_NOTES.forEach(n => {
                const option = document.createElement('option');
                option.value = n;
                option.textContent = n;
                if (n === note) option.selected = true;
                tuningSelect.appendChild(option);
            });
            tuningSelect.addEventListener('change', () => {
                rebuildFretboard();
            });

            const startFretInput = document.createElement('input');
            startFretInput.type = 'number';
            startFretInput.className = 'start-fret';
            startFretInput.min = 0;
            startFretInput.max = 15;
            startFretInput.value = 0;
            startFretInput.dataset.string = originalIndex;

            const toSpan = document.createElement('span');
            toSpan.textContent = 'to';

            const endFretInput = document.createElement('input');
            endFretInput.type = 'number';
            endFretInput.className = 'end-fret';
            endFretInput.min = 0;
            endFretInput.max = 15;
            endFretInput.value = 15;
            endFretInput.dataset.string = originalIndex;
            
            [startFretInput, endFretInput].forEach(input => {
                input.addEventListener('change', () => {
                     // Ensure start <= end
                    if (parseInt(startFretInput.value) > parseInt(endFretInput.value)) {
                        if (input.classList.contains('start-fret')) {
                            endFretInput.value = startFretInput.value;
                        } else {
                            startFretInput.value = endFretInput.value;
                        }
                    }
                    rebuildFretboard();
                });
            });

            stringControlDiv.append(label, tuningSelect, startFretInput, toSpan, endFretInput);
            stringControlsContainer.appendChild(stringControlDiv);
        });
    }

    instrumentSelect.addEventListener('change', (e) => {
        const preset = TUNING_PRESETS[e.target.value];
        if (preset) {
            TUNING = preset.tuning;
            rebuildStrings();
            updateTuningControls();
            rebuildFretboard();
            fretboardViewSelect.value = "full-fretboard"; // Reset view
        }
    });

    numStringsSelect.addEventListener('change', (e) => {
        const numStrings = parseInt(e.target.value, 10);
        switch(numStrings) {
            case 4:
                TUNING = ['G', 'D', 'A', 'E']; // Bass EADG, high to low
                break;
            case 5:
                TUNING = ['G', 'D', 'A', 'E', 'B']; // 5-string Bass BEADG, high to low
                break;
            case 7:
                TUNING = ['E', 'B', 'G', 'D', 'A', 'E', 'B']; // 7-string Guitar BEADGBE, high to low
                break;
            case 6:
            default:
                TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // Standard Guitar EADGBe
                break;
        }

        rebuildStrings();
        updateTuningControls();
        rebuildFretboard();
        fretboardViewSelect.value = "full-fretboard"; // Reset view
    });


    // Function to update the current selection display text
    function updateCurrentSelectionDisplay() {
        let displayString = "";
        let intervalString = "";
        let noteStringSharp = "";
        let noteStringFlat = "";

        const selectedKey = keySelect.value;
        const selectedOption = scaleSelect.options[scaleSelect.selectedIndex];
        const selectedOptionText = selectedOption.textContent;
        
        let currentKeyForNotes;
        let currentScaleNameForNotes;

        if (isPlaying && currentSlideshow && currentSlideshow[currentSlideIndex]) {
            const slide = currentSlideshow[currentSlideIndex];
            currentKeyForNotes = slide.key || selectedKey;
            const humanReadableName = getHumanReadableName(slide.name);
            const keyDisplay = ENHARMONIC_MAP[currentKeyForNotes] ? `${currentKeyForNotes}/${ENHARMONIC_MAP[currentKeyForNotes]}` : currentKeyForNotes;
            displayString = `${keyDisplay} ${humanReadableName}`;
            currentScaleNameForNotes = slide.name;
        } else {
            currentKeyForNotes = selectedKey;
            currentScaleNameForNotes = scaleSelect.value;
            if (currentScaleNameForNotes === "") {
                displayString = "Ready to select a scale or chord";
            } else {
                const keyDisplay = ENHARMONIC_MAP[currentKeyForNotes] ? `${currentKeyForNotes}/${ENHARMONIC_MAP[currentKeyForNotes]}` : currentKeyForNotes;
                displayString = `${keyDisplay} ${selectedOptionText}`;
                if (selectedOption.closest('optgroup')?.label.includes('Scale') && currentScaleNameForNotes !== 'chromatic') {
                     // The logic to add ' Scale' suffix can be refined or removed if text content is sufficient
                }
            }
        }
        
        intervalString = getIntervalString(currentScaleNameForNotes);
        noteStringSharp = getNoteString(currentKeyForNotes, currentScaleNameForNotes, false);
        noteStringFlat = getNoteString(currentKeyForNotes, currentScaleNameForNotes, true);
        
        currentSelectionDisplay.textContent = displayString;
        currentSelectionIntervals.textContent = intervalString;

        // Hide or show based on content
        if (noteStringSharp && noteStringFlat && noteStringSharp !== noteStringFlat) {
            currentSelectionNotesEnharmonicSharp.textContent = noteStringSharp;
            currentSelectionNotesEnharmonicFlat.textContent = noteStringFlat;
            currentSelectionNotesEnharmonicSharp.style.display = 'block';
            currentSelectionNotesEnharmonicFlat.style.display = 'block';
        } else {
            currentSelectionNotesEnharmonicSharp.textContent = noteStringSharp || noteStringFlat;
            currentSelectionNotesEnharmonicSharp.style.display = 'block';
            currentSelectionNotesEnharmonicFlat.style.display = 'none';
        }
    }

    function getHumanReadableName(value) {
        const option = scaleSelect.querySelector(`option[value="${value}"]`);
        return option ? option.textContent : value.replace(/-/g, ' ');
    }

    // Function to get interval names for a scale
    function getIntervalString(scaleName) {
        if (!SCALES[scaleName] || scaleName === 'chromatic') return '';
        
        const intervalNames = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
        const scaleIntervals = SCALES[scaleName];

        if (scaleIntervals.length === 1 && scaleIntervals[0] === 0) {
            return 'R';
        }

        return scaleIntervals.map(i => intervalNames[i]).join('-');
    }

    // Function to get note names for a scale
    function getNoteString(key, scaleName, preferFlat = false) {
        if (!SCALES[scaleName] || scaleName === 'chromatic' || scaleName === "") return '';
        
        const scaleNotes = getScaleNotes(key, scaleName, preferFlat);
        
        if (scaleNotes.length === 0) return '';
        
        // Determine the key's display name based on the sharp/flat preference
        let keyDisplay;
        if (preferFlat) {
            keyDisplay = ENHARMONIC_MAP[key] || key;
        } else {
            // Find the sharp name for a flat key if it exists
            const sharpKey = Object.keys(ENHARMONIC_MAP).find(k => ENHARMONIC_MAP[k] === key);
            keyDisplay = sharpKey || key;
        }
        
        const noteList = scaleNotes.join('-');
        
        return `${keyDisplay}: (${noteList})`;
    }

    // Initial note creation and display update
    rebuildFretboard();

    // --- Controls ---
    toggleAllNotes.addEventListener('change', (e) => {
        const selectedScale = scaleSelect.value;
        const selectedKey = keySelect.value;
        const scaleNotes = getScaleNotes(selectedKey, selectedScale);
        
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => {
            const noteName = note.dataset.note;
            
            // Remove existing classes
            note.classList.remove('in-scale', 'root');
            
            if (selectedScale === 'chromatic' || (document.body.className.includes('preset-chromatic-') && !document.body.className.includes('root'))) {
                note.classList.add('in-scale');
            } else if (scaleNotes.includes(noteName)) {
                note.classList.add('in-scale');
            }
            
            // Mark root notes
            if (noteName === selectedKey) {
                note.classList.add('root');
            }

            // During quiz, only the question note should be visible
            if (isQuizActive && !note.classList.contains('visible')) {
                note.classList.remove('in-scale', 'root');
            }
            
            if (e.target.checked && scaleNotes.includes(noteName)) {
                note.classList.add('visible');
            } else if (!e.target.checked) {
                // Don't hide the quiz question note
                if (!isQuizActive || (isQuizActive && !nextQuestionBtn.classList.contains('hidden'))) {
                    note.classList.remove('visible');
                }
            }
        });
    });

    // --- Event Listeners for UI Controls ---

    noteColorPreset.addEventListener('change', () => {
        updateNoteColorPreset();
        updateNoteClasses(); // Re-apply classes to reflect new colors
    });

    pageThemeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        // Find any existing theme or preset classes and remove them
        const classList = Array.from(document.body.classList);
        for (const cls of classList) {
            if (cls.endsWith('-mode') || cls.startsWith('preset-')) {
                document.body.classList.remove(cls);
            }
        }
        
        // Add the new page theme
        document.body.classList.add(theme);

        // Re-apply the note color preset class
        const currentPreset = noteColorPreset.value;
        if (currentPreset !== 'default') {
            document.body.classList.add(`preset-${currentPreset}`);
        }
    });


    // --- Modal Logic ---
    openFretboardControlsBtn.addEventListener('click', () => {
        controlsModal.style.display = 'flex';
    });
    
    closeControlsModalBtn.addEventListener('click', () => {
        controlsModal.style.display = 'none';
    });
    
    // --- Custom Themes Modal Logic ---
    openCustomThemesBtn.addEventListener('click', () => {
        customThemesModal.style.display = 'flex';
    });
    
    closeCustomThemesModalBtn.addEventListener('click', () => {
        customThemesModal.style.display = 'none';
    });

    // --- Fret Range Modal Logic ---
    openFretRangeBtn.addEventListener('click', () => {
        fretRangeModal.style.display = 'flex';
    });

    closeFretRangeModalBtn.addEventListener('click', () => {
        fretRangeModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === controlsModal) {
            controlsModal.style.display = 'none';
        }
        if (event.target === customThemesModal) {
            customThemesModal.style.display = 'none';
        }
        if (event.target === fretRangeModal) {
            fretRangeModal.style.display = 'none';
        }
    });

    // Initialize tuning controls on load
    updateTuningControls();

    // --- CSV Import/Export Logic ---
    const CSV_HEADERS = ['key', 'type', 'name', 'description', 'measures'];

    const IMPORTED_SLIDESHOW_CSV_CONTENT = `key,type,name,description,measures
C,scale,major,C Major Scale
D,scale,minor,D Natural Minor Scale
E,chord,dom7,E Dominant 7th Chord
F#,interval,perfect-5th,F# Perfect 5th Interval
G,scale,major,G Major Scale
A,chord,minor-triad,A Minor 7th Chord
B,scale,minor,B Minor 7th Chord
C#,interval,tritone,C# Tritone Interval
D#,chord,dim7,D# Diminished 7th Chord
F,scale,pentatonic-major,F Pentatonic Major Scale
G#,chord,sus4,G# Sus4 Chord
A#,scale,mixolydian,A# Mixolydian Mode
B,interval,minor-3rd,B Minor 3rd Interval
C,chord,add9,C Add9 Chord
D,scale,lydian,D Lydian Mode
E,chord,min-maj7,E Minor Major 7th Chord
F#,scale,harmonic-minor,F# Harmonic Minor Scale
G,interval,major-6th,G Major 6th Interval
A,chord,13,A Dominant 13th Chord
B,scale,whole-tone,B Whole Tone Scale
C,chord,augmented,C Augmented Triad
D,interval,unison,D Unison Interval
E,scale,ionian,E Ionian Mode
F#,chord,m11,F# Minor 11th Chord
G,scale,aeolian,G Aeolian Mode
A,chord,maj13,A Major 13th Chord
B,scale,hungarian-minor,B Hungarian Minor Scale
C#,chord,half-dim7,C# Half-Diminished 7th Chord
D#,scale,neapolitan-minor,D# Neapolitan Minor Scale
F,chord,min7,F Minor 7th Chord
G#,scale,persian,G# Persian Scale
A#,chord,maj9,A# Major 9th Chord
G,scale,minor-blues,G Minor Blues Scale
C,scale,harmonic-major,C Harmonic Major Scale
A,scale,melodic-minor,A Melodic Minor Scale
E,scale,whole-half-diminished,E Whole-Half Diminished Scale
B,scale,bebop-dominant,B Bebop Dominant Scale
D,scale,bebop-major,D Bebop Major Scale
E,scale,bebop-minor,E Bebop Minor Scale
F#,scale,blues-bebop,F# Blues Bebop Scale
G,scale,dorian-bebop,G Dorian Bebop Scale
A,scale,lydian-bebop,A Lydian Bebop Scale
B,scale,mixolydian-bebop-alt,B Mixolydian Bebop Alt Scale
C,scale,phrygian-bebop,C Phrygian Bebop Scale
D,scale,harmonic-minor-bebop,D Harmonic Minor Bebop Scale
E,scale,melodic-minor-bebop,E Melodic Minor Bebop Scale
F#,scale,whole-tone-bebop,F# Whole Tone Bebop Scale
G,scale,diminished-bebop,G Diminished Bebop Scale
A,scale,tritone-pentatonic,A Tritone Pentatonic Scale
B,scale,augmented-diminished,B Augmented Diminished Scale
C,scale,lydian-phrygian,C Lydian Phrygian Scale
D,scale,mixolydian-lydian,D Mixolydian Lydian Scale
E,scale,phrygian-locrian,E Phrygian Locrian Scale
F,scale,minor-pentatonic,F Minor Pentatonic Scale
G,scale,minor-pentatonic-add-2,G Minor Pentatonic Add 2 Scale
A,scale,minor-pentatonic-add-4,A Minor Pentatonic Add 4 Scale
B,scale,minor-pentatonic-add-5,B Minor Pentatonic Add 5 Scale
C,scale,minor-pentatonic-add-6,C Minor Pentatonic Add 6 Scale
D,scale,minor-pentatonic-add-7,D Minor Pentatonic Add 7 Scale
E,scale,minor-pentatonic-add-8,E Minor Pentatonic Add 8 Scale
F#,scale,minor-pentatonic-add-9,F# Minor Pentatonic Add 9 Scale
G,scale,minor-pentatonic-add-10,G Minor Pentatonic Add 10 Scale
A,scale,minor-pentatonic-add-11,A Minor Pentatonic Add 11 Scale
B,scale,minor-pentatonic-add-12,B Minor Pentatonic Add 12 Scale
C,scale,minor-pentatonic-add-13,C Minor Pentatonic Add 13 Scale
F#,scale,minor-pentatonic-add-14,F# Minor Pentatonic Add 14 Scale
G,scale,minor-pentatonic-add-15,G Minor Pentatonic Add 15 Scale
`;

    function parseCSV(csvContent) {
        const lines = csvContent.trim().split('\n');
        const headerLine = lines.shift() || '';
        const header = headerLine.split(',').map(h => h.trim());
        const data = [];

        for (const line of lines) {
            const values = line.split(',').map(v => v.trim());
            if (values.length === 0 || (values.length === 1 && values[0] === '')) continue; // Skip empty lines

            const entry = {};
            header.forEach((h, index) => {
                if (values[index] !== undefined) {
                    entry[h] = values[index];
                }
            });

            // Add title for display
            if (entry.name) {
                const nameDisplay = entry.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                entry.title = nameDisplay;
            }

            data.push(entry);
        }
        return data;
    }

    // Load the default imported slideshow
    SLIDESHOWS['default-imported-slideshow'] = parseCSV(IMPORTED_SLIDESHOW_CSV_CONTENT);

    importSlideshowBtn.addEventListener('click', () => {
        importSlideshowFileInput.click();
    });

    importSlideshowFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvContent = e.target.result;
                const importedData = parseCSV(csvContent);
                
                if (importedData.length > 0) {
                    const slideshowKey = `imported-${Date.now()}`;
                    const slideshowName = file.name.replace('.csv', '');
                    
                    SLIDESHOWS[slideshowKey] = importedData;
                    addSlideshowToSelect(slideshowKey, `${slideshowName} (Imported)`);
                    slideshowSelect.value = slideshowKey; // Select the newly imported slideshow
                    
                    alert(`Slideshow "${slideshowName}" imported successfully!`);
                } else {
                    alert('Could not parse any valid data from the CSV file.');
                }
            } catch (error) {
                console.error("Error parsing CSV:", error);
                alert("Failed to import CSV. Please check the file format and content.");
            }
        };
        reader.readAsText(file);
    });

    downloadSlideshowTemplateBtn.addEventListener('click', () => {
        const templateContent = `${CSV_HEADERS.join(',')}\nC,scale,major,Example C Major scale,4\nA,chord,minor-triad,Example A Minor 7th chord,2\nG,scale,major-triad,Example G Major scale,`;
        const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "slideshow_template.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    downloadAllDefinitionsBtn.addEventListener('click', () => {
        const csvRows = ['type,name,intervals'];

        for (const [name, intervals] of Object.entries(SCALES)) {
            let type = 'scale'; // Default type
            if (ALL_CHORDS_NAMES.includes(name)) {
                type = 'chord';
            } else if (ALL_INTERVALS_NAMES.includes(name)) {
                type = 'interval';
            }

            const intervalString = getIntervalString(name);
            csvRows.push(`${type},${name},"${intervalString}"`);
        }

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "all_definitions.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Export elements
    const exportKeyDiagramsBtn = document.getElementById('export-key-diagrams-btn');
    const exportStatusOverlay = document.getElementById('export-status-overlay');
    const exportStatusMessage = document.getElementById('export-status-message');
    const exportAllKeysDiagramsBtn = document.getElementById('export-all-keys-diagrams-btn');

    // --- Export to ZIP functionality ---

    function showExportStatus(message) {
        exportStatusMessage.textContent = message;
        exportStatusOverlay.classList.remove('hidden');
    }

    function hideExportStatus() {
        exportStatusOverlay.classList.add('hidden');
    }

    function getDiagramList() {
        const diagramsToExport = [];
        const optgroups = scaleSelect.querySelectorAll('optgroup');
        optgroups.forEach(optgroup => {
            // Exclude custom slideshows from batch export
            if (optgroup.label === 'Custom Slideshows') {
                return;
            }
            const options = optgroup.querySelectorAll('option');
            options.forEach(option => {
                if (option.value) {
                    let type = 'Scale'; // default
                    if (optgroup.label.includes('Chord')) {
                        type = 'Chord';
                    } else if (optgroup.label.includes('Interval')) {
                        type = 'Interval';
                    }
                    diagramsToExport.push({
                        name: option.value,
                        text: option.textContent,
                        type: type
                    });
                }
            });
        });
        // Also include the "All Notes (Chromatic)" option
        const chromaticOption = scaleSelect.querySelector('option[value="chromatic"]');
        if (chromaticOption) {
            diagramsToExport.unshift({ name: 'chromatic', text: chromaticOption.textContent, type: 'Scale' });
        }
        return diagramsToExport;
    }

    async function generateDiagramsForKeys(keysToExport) {
        const zip = new window.JSZip();
        const diagramsToExport = getDiagramList();

        let totalProgress = 0;
        const totalDiagrams = diagramsToExport.length * keysToExport.length;
        
        for (const key of keysToExport) {
            // Programmatically set key for UI updates.
            keySelect.value = key;
            
            const noteDisplaySelect = document.getElementById('note-display-type');
            const noteDisplayText = noteDisplaySelect.options[noteDisplaySelect.selectedIndex].text;
            const fretboardViewSelect = document.getElementById('fretboard-view-select');
            const fretboardViewText = fretboardViewSelect.options[fretboardViewSelect.selectedIndex].text;
            const tuningArray = getCurrentTuning();
            const tuningText = [...tuningArray].reverse().join('');

            for (const diagram of diagramsToExport) {
                totalProgress++;
                const keyProgress = keysToExport.length > 1 ? `Key: ${key} (${keysToExport.indexOf(key) + 1}/${keysToExport.length})` : `Key: ${key}`;
                showExportStatus(`${keyProgress}\nGenerating diagram ${totalProgress} of ${totalDiagrams}\n${key} ${diagram.text}`);

                scaleSelect.value = diagram.name;
                updateNoteClasses();
                updateCurrentSelectionDisplay();
                
                const notes = fretboard.querySelectorAll('.note');
                const scaleNotes = getScaleNotes(key, diagram.name);
                notes.forEach(note => {
                    note.classList.toggle('visible', scaleNotes.includes(note.dataset.note));
                });

                await new Promise(resolve => setTimeout(resolve, 50));

                try {
                    const canvas = await html2canvas(fretboard, {
                        scale: 2, // Higher resolution
                        useCORS: true,
                        backgroundColor: null // Transparent background
                    });
                    const imageData = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
                    const intervalString = getIntervalString(diagram.name);
                    const cleanKeyFolder = key.replace('#', 's');
                    
                    const baseFilename = `${intervalString ? intervalString + ' - ' : ''}${diagram.type} - ${diagram.text} - ${noteDisplayText} - ${fretboardViewText} - ${tuningText} - ${getEnharmonicDisplay(key)}.jpg`;
                    const cleanFilename = baseFilename.replace(/[/\\?%*:|"<>]/g, '-').replace('#', 's');
                    
                    const finalPath = keysToExport.length > 1 ? `${cleanKeyFolder}/${cleanFilename}` : cleanFilename;

                    zip.file(finalPath, imageData, { base64: true });
                } catch (error) {
                    console.error(`Failed to capture diagram for ${diagram.text} in key ${key}:`, error);
                }
            }
        }
        return zip;
    }

    async function exportKeyDiagrams() {
        const selectedKey = keySelect.value;
        showExportStatus(`Preparing to export diagrams for key: ${getEnharmonicDisplay(selectedKey)}`);
        const zip = await generateDiagramsForKeys([selectedKey]);
        
        showExportStatus('Zipping files...');

        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = `Fretboard_Diagrams_${getEnharmonicDisplay(selectedKey)}_Key.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                hideExportStatus();
            });
    }
    
    async function exportAllKeysDiagrams() {
        showExportStatus('Preparing to export diagrams for all keys...');
        const zip = await generateDiagramsForKeys(CHROMATIC_SCALE);

        showExportStatus('Zipping all files...');

        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = `Fretboard_Diagrams_All_Keys.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                hideExportStatus();
            });
    }

    exportKeyDiagramsBtn.addEventListener('click', exportKeyDiagrams);
    exportAllKeysDiagramsBtn.addEventListener('click', exportAllKeysDiagrams);
});