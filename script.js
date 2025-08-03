document.addEventListener('DOMContentLoaded', () => {
    const fretboard = document.getElementById('fretboard');
    const toggleAllNotes = document.getElementById('show-notes-toggle');
    const keySelect = document.getElementById('key-select');
    const scaleSelect = document.getElementById('scale-select');
    const fretboardSelect = document.getElementById('fretboard-select');
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
    const noteShapeSelect = document.getElementById('note-shape-select'); 
    const fretNumbersDisplay = document.getElementById('fret-numbers-display'); 
    const noteSizeSlider = document.getElementById('note-size');
    const noteSizeValue = document.getElementById('note-size-value');

    // Quiz elements
    const quizTypeSelect = document.getElementById('quiz-type-select');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const stopQuizBtn = document.getElementById('stop-quiz-btn');

    // Modal elements (references kept for safety, but functionality is removed)
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('fretboard-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalFretboardContent = document.getElementById('modal-fretboard-content');
    const slideshowTimeRemaining = document.getElementById('slideshow-time-remaining');

    // Custom theme controls
    const customThemesHeader = document.getElementById('custom-themes-header');
    const customThemesContent = document.getElementById('custom-themes-content');
    const customSlideshowName = document.getElementById('custom-slideshow-name');
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

    // Main controls collapsible elements
    const mainControlsHeader = document.getElementById('main-controls-header');
    const mainControlsContent = document.getElementById('main-controls-content');

    // Slideshow buttons
    const slideshowPlay = document.getElementById('slideshow-play');
    const slideshowPlayHidden = document.getElementById('slideshow-play-hidden');
    const slideshowStop = document.getElementById('slideshow-stop');
    const slideshowStopHidden = document.getElementById('slideshow-stop-hidden');
    const slideshowPause = document.getElementById('slideshow-pause');
    const slideshowPrev = document.getElementById('slideshow-prev');
    const slideshowNext = document.getElementById('slideshow-next');
    const slideshowSelectHiddenMain = document.getElementById('slideshow-select-hidden');

    const NUM_FRETS = 15; 
    let TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; 
    const CHROMATIC_SCALE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    const SOLFEGE_CHROMATIC = ['La', 'Li', 'Ti', 'Do', 'Di', 'Re', 'Ri', 'Mi', 'Fa', 'Fi', 'Sol', 'Si'];

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
        'double-harmonic-major': [0, 1, 4, 5, 7, 8, 11],
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
        'whole-half-diminished': [0, 2, 3, 5, 6, 8, 9, 11],
        'lydian-dominant': [0, 2, 4, 6, 7, 9, 10],
        'super-locrian': [0, 1, 3, 4, 6, 8, 10],
        'mixolydian-b6': [0, 2, 4, 5, 7, 8, 10],
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
        'blues-phrygian': [0, 1, 3, 5, 6, 7, 8, 10],
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

    // Arrays to categorize scale types for display purposes
    const ALL_SCALES_NAMES = Array.from(document.querySelector('#scale-select optgroup[label="Scales"]').children).map(opt => opt.value);
    const ALL_INTERVALS_NAMES = Array.from(document.querySelector('#scale-select optgroup[label="Intervals"]').children).map(opt => opt.value);
    const ALL_CHORDS_NAMES = Array.from(document.querySelector('#scale-select optgroup[label="Chords"]').children).map(opt => opt.value);
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

    // Add custom themes collapsible functionality
    customThemesHeader.addEventListener('click', () => {
        customThemesContent.classList.toggle('collapsed');
        customThemesHeader.querySelector('.collapse-icon').classList.toggle('rotated');
    });

    // Main controls collapsible functionality
    mainControlsHeader.addEventListener('click', () => {
        mainControlsContent.classList.toggle('collapsed');
        mainControlsHeader.querySelector('.collapse-icon').classList.toggle('rotated');
    });

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
        itemNameSelect.value = '';
        itemDescription.value = '';
        itemMeasures.value = '2';
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
        slideshowSelectHiddenMain.appendChild(option.cloneNode(true));

        // Also add to the hidden select to keep them in sync
        const hiddenOption = option.cloneNode(true);
        const hiddenSlideshowSelect = document.getElementById('slideshow-select-hidden');
        if (hiddenSlideshowSelect) {
            hiddenSlideshowSelect.appendChild(hiddenOption);
        }
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
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'The I chord, the tonic.' },
            { key: 'B', type: 'chord', name: 'major-triad', title: 'B Major', description: 'The III chord, a chromatic major chord.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The IV chord, the subdominant.' },
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
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'The I chord. Strum with C Major scale melodies.' },
            { key: 'C', type: 'scale', name: 'major', title: 'C Major Scale', description: 'The happy, bright foundation.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'The vi chord, the relative minor.' },
            { key: 'A', type: 'scale', name: 'pentatonic-minor', title: 'A Minor Pentatonic', description: 'Perfect for classic country licks.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'The V chord. Target the chord tones.' },
            { key: 'E', type: 'scale', name: 'mixolydian', title: 'E Mixolydian', description: 'The perfect scale to outline the V7 sound.' }
        ],
        'flamenco-progression': [
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'i - Tonic minor.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'VII - Subtonic.' },
            { key: 'F', type: 'chord', name: 'major-triad', title: 'F Major', description: 'VI - Submediant.' },
            { key: 'E', type: 'chord', name: 'major-triad', title: 'E Major', description: 'V - Dominant (often played as a major chord).' }
        ],
        'cry-me-a-river': [
            { key: 'A', type: 'chord', name: 'min7', title: 'A Minor 7', description: 'i - Tonic minor.' },
            { key: 'D', type: 'chord', name: 'dom7', title: 'D Dominant 7', description: 'V7/V - Secondary dominant.' },
            { key: 'G', type: 'chord', name: 'maj7', title: 'G Major 7', description: 'VII - Subtonic major.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'C Major 7', description: 'III - Relative major.' },
            { key: 'F#', type: 'chord', name: 'half-dim7', title: 'F# Half-Diminished 7', description: 'viø7 - Submediant half-diminished.' },
            { key: 'B', type: 'chord', name: 'dom7', title: 'B Dominant 7', description: 'V7/ii - Secondary dominant.' },
            { key: 'E', type: 'chord', name: 'min7', title: 'E Minor 7', description: 'v - Dominant minor.' },
            { key: 'A', type: 'chord', name: 'dom7', title: 'A Dominant 7', description: 'V7/IV - Leading to Dm.' }
        ],
        'a-day-in-the-life': [
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'I - Opens the verse.' },
            { key: 'B', type: 'chord', name: 'minor-triad', title: 'B Minor', description: 'iii - Minor mediant.' },
            { key: 'E', type: 'chord', name: 'minor-triad', title: 'E Minor', description: 'vi - Submediant.' },
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'IV - Subdominant.' }
        ],
        'all-the-things-you-are': [
            { key: 'F', type: 'chord', name: 'min7', title: 'F Minor 7', description: 'i - Tonic in F minor (section start).' },
            { key: 'B', type: 'chord', name: 'min7', title: 'B Minor 7', description: 'iv - Subdominant.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E Dominant 7', description: 'V7 - Dominant.' },
            { key: 'A', type: 'chord', name: 'maj7', title: 'A Major 7', description: 'III - Relative major.' },
            { key: 'D', type: 'chord', name: 'maj7', title: 'D Major 7', description: 'VI - Submediant major.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G Dominant 7', description: 'V7/V - Secondary dominant.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'C Major 7', description: 'V - Dominant major (section end).' }
        ],
        'stairway-to-heaven': [
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'i - Tonic.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'VII - Subtonic.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'F Major 7', description: 'VI - Subdominant.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'VII - Subtonic again.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'i - Returning to tonic.' }
        ],
        'heart-and-soul': [
            { key: 'C', type: 'chord', name: 'major-triad', title: 'C Major', description: 'I - Tonic.' },
            { key: 'A', type: 'chord', name: 'minor-triad', title: 'A Minor', description: 'vi - Submediant.' },
            { key: 'D', type: 'chord', name: 'minor-triad', title: 'D Minor', description: 'ii - Supertonic.' },
            { key: 'G', type: 'chord', name: 'major-triad', title: 'G Major', description: 'V - Dominant.' }
        ],
        'take-five': [
            { key: 'E', type: 'chord', name: 'min7', title: 'E Minor 7', description: 'The ii chord. Use E Dorian.' },
            { key: 'B', type: 'chord', name: 'min7', title: 'B Minor 7', description: 'The V chord. Use B Mixolydian or B Phrygian Dominant for tension.' }
        ],
        'jazz-progressions': [
            { type: 'scale', name: 'major', title: 'Major Scale', description: 'Foundation of jazz harmony' },
            { type: 'chord', name: 'maj7', title: 'Major 7th', description: 'Sophisticated major sound' },
            { type: 'scale', name: 'dorian', title: 'Dorian Mode', description: 'Minor with raised 6th' },
            { type: 'chord', name: 'min7', title: 'Minor 7th', description: 'Basic minor jazz chord' },
            { type: 'scale', name: 'mixolydian', title: 'Mixolydian Mode', description: 'Dominant chord scale' },
            { type: 'chord', name: 'dom7', title: 'Dominant 7th', description: 'Creates tension and movement' },
            { type: 'interval', name: 'perfect-5th', title: 'Perfect 5th', description: 'Strong harmonic foundation' },
            { type: 'chord', name: 'half-dim7', title: 'Half Diminished 7th', description: 'Minor 7♭5 chord' },
            { type: 'scale', name: 'altered', title: 'Altered Scale', description: 'Super Locrian mode' },
            { type: 'chord', name: 'dim7', title: 'Diminished 7th', description: 'Passing chord favorite' },
            { type: 'interval', name: 'tritone', title: 'Tritone', description: 'Devil\'s interval creates tension' },
            { type: 'scale', name: 'bebop-dominant', title: 'Bebop Dominant', description: '8-note scale for dom7 chords' },
            { type: 'chord', name: 'maj9', title: 'Extended major bebop' },
            { type: 'scale', name: 'bebop-major', title: 'Bebop Major', description: 'Major scale with chromatic passing tone' },
            { type: 'chord', name: 'm9', title: 'Rich minor color' },
            { type: 'interval', name: 'major-7th', title: 'Dreamy, floating interval' },
            { type: 'scale', name: 'lydian-dominant', title: 'Lydian Dominant', description: 'Fusion exotic scale' },
            { type: 'chord', name: '11', title: 'Dominant 11th', description: 'Suspended bebop harmony' }
        ],
        'blues-journey': [
            { type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Classic 6-note blues scale' },
            { type: 'chord', name: 'dom7', title: 'Basic blues chord' },
            { type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'Foundation of blues' },
            { type: 'interval', name: 'minor-3rd', title: 'Blue note feeling' },
            { type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'Happy blues sound' },
            { type: 'chord', name: '7b5', title: '7♭5', description: 'Blues with tension' },
            { type: 'scale', name: 'minor-blues', title: 'Extended minor blues' },
            { type: 'interval', name: 'perfect-4th', title: 'Bluesy suspension' },
            { type: 'chord', name: 'sus4', title: 'Suspended resolution' },
            { type: 'scale', name: 'pentatonic-blues', title: 'Pentatonic Blues', description: 'Hybrid pentatonic approach' },
            { type: 'interval', name: 'minor-7th', title: 'Minor 7th', description: 'Dominant 7th color' },
            { type: 'chord', name: 'add9', title: 'Add9', description: 'Major with 9th added' },
            { type: 'scale', name: 'dorian', title: 'Dorian', description: 'Minor blues alternative' },
            { type: 'interval', name: 'major-2nd', title: '9th interval color' },
            { type: 'chord', name: 'sus2', title: 'Open blues sound' }
        ],
        'classical-modes': [
            { type: 'scale', name: 'ionian', title: 'Ionian Mode', description: 'Major scale, bright and happy' },
            { type: 'scale', name: 'dorian', title: 'Dorian Mode', description: 'Minor with raised 6th, medieval' },
            { type: 'scale', name: 'phrygian', title: 'Phrygian Mode', description: 'Minor with flat 2nd, Spanish flavor' },
            { type: 'scale', name: 'lydian', title: 'Lydian Mode', description: 'Major with raised 4th, ethereal' },
            { type: 'scale', name: 'mixolydian', title: 'Mixolydian Mode', description: 'Major with flat 7th, folk-like' },
            { type: 'scale', name: 'aeolian', title: 'Aeolian Mode', description: 'Natural minor, melancholic' },
            { type: 'scale', name: 'locrian', title: 'Locrian Mode', description: 'Diminished feel, unstable' },
            { type: 'interval', name: 'unison', title: 'Unison', description: 'Same note, perfect consonance' },
            { type: 'interval', name: 'major-2nd', title: 'Major 2nd', description: 'Whole step, gentle dissonance' },
            { type: 'interval', name: 'major-3rd', title: 'Major 3rd', description: 'Happy, bright sound' },
            { type: 'interval', name: 'perfect-4th', title: 'Perfect 4th', description: 'Open, stable interval' },
            { type: 'interval', name: 'perfect-5th', title: 'Perfect 5th', description: 'Strong, fundamental harmony' },
            { type: 'interval', name: 'major-6th', title: 'Major 6th', description: 'Sweet, consonant interval' },
            { type: 'interval', name: 'major-7th', title: 'Major 7th', description: 'Leading tone, seeks resolution' },
            { type: 'interval', name: 'octave', title: 'Octave', description: 'Same note class, perfect consonance' },
            { type: 'chord', name: 'major-triad', title: 'Major Triad', description: 'Basic happy chord' },
            { type: 'chord', name: 'minor-triad', title: 'Minor Triad', description: 'Basic sad chord' },
            { type: 'chord', name: 'diminished', title: 'Diminished Triad', description: 'Tense, unstable chord' },
            { type: 'chord', name: 'augmented', title: 'Augmented Triad', description: 'Mysterious, floating chord' },
            { type: 'scale', name: 'greek-dorian', title: 'Greek Dorian', description: 'Ancient Greek mode' }
        ],
        'rock-pop': [
            { type: 'scale', name: 'pentatonic-minor', title: 'Minor Pentatonic', description: 'Rock guitar foundation' },
            { type: 'chord', name: 'major-triad', title: 'Power chord base' },
            { type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'Country rock flavor' },
            { type: 'chord', name: 'minor-triad', title: 'Moody rock chord' },
            { type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Rock with attitude' },
            { type: 'interval', name: 'perfect-5th', title: 'Perfect 5th', description: 'Power chord interval' },
            { type: 'chord', name: 'sus4', title: 'Rock suspension chord' },
            { type: 'scale', name: 'mixolydian', title: 'Mixolydian Mode', description: 'Rock dominant sound' },
            { type: 'chord', name: 'sus2', title: 'Modern rock sound' },
            { type: 'interval', name: 'perfect-4th', title: 'Rock melody interval' },
            { type: 'scale', name: 'dorian', title: 'Dorian Mode', description: 'Progressive rock' },
            { type: 'chord', name: 'add9', title: 'Add9', description: 'Pop color chord' },
            { type: 'interval', name: 'major-2nd', title: '9th chord color' },
            { type: 'chord', name: '6', title: 'Major 6th', description: 'Vintage pop sound' },
            { type: 'scale', name: 'minor', title: 'Natural Minor', description: 'Dark rock foundation' },
            { type: 'chord', name: 'dom7', title: 'Dominant 7th', description: 'Rock with edge' },
            { type: 'interval', name: 'minor-7th', title: 'Minor 7th', description: 'Dominant color' },
            { type: 'chord', name: 'maj7', title: 'Dreamy pop chord' },
            { type: 'scale', name: 'major', title: 'Major Scale', description: 'Happy pop foundation' },
            { type: 'interval', name: 'major-3rd', title: 'Happy interval' }
        ],
        'latin-rhythms': [
            { type: 'scale', name: 'phrygian-dominant', title: 'Phrygian Dominant', description: 'Spanish/Latin flavor' },
            { type: 'chord', name: 'major-triad', title: 'Bright Latin sound' },
            { type: 'scale', name: 'harmonic-minor', title: 'Harmonic Minor', description: 'Exotic Latin scale' },
            { type: 'chord', name: 'augmented', title: 'Augmented Triad', description: 'Mysterious Latin chord' },
            { type: 'scale', name: 'double-harmonic-major', title: 'Double Harmonic Major', description: 'Byzantine scale' },
            { type: 'interval', name: 'minor-2nd', title: 'Spanish half-step' },
            { type: 'scale', name: 'byzantine', title: 'Byzantine Scale', description: 'Eastern Orthodox music' },
            { type: 'chord', name: 'dim7', title: 'Diminished 7th', description: 'Mediterranean passing chord' },
            { type: 'scale', name: 'maqam-hijaz', title: 'Maqam Hijaz', description: 'Arabic Mediterranean' },
            { type: 'chord', name: 'major-triad', title: 'Bright Mediterranean' },
            { type: 'scale', name: 'spanish-phrygian', title: 'Spanish Phrygian', description: 'Flamenco Mediterranean' },
            { type: 'interval', name: 'augmented-2nd', title: 'Exotic Mediterranean interval' },
            { type: 'scale', name: 'flamenco', title: 'Flamenco Scale', description: 'Spanish Mediterranean dance' },
            { type: 'chord', name: 'dom7', title: 'Dominant 7th', description: 'Mediterranean dominant' },
            { type: 'scale', name: 'andalusian', title: 'Andalusian Scale', description: 'Southern Spanish' },
            { type: 'chord', name: 'half-dim7', title: 'Half Diminished 7th', description: 'Complex Mediterranean harmony' },
            { type: 'scale', name: 'maqam-kurd', title: 'Maqam Kurd', description: 'Kurdish Mediterranean' },
            { type: 'interval', name: 'tritone', title: 'Tritone', description: 'Mediterranean tension' },
            { type: 'chord', name: 'min-maj7', title: 'Minor Major 7th', description: 'Mysterious Mediterranean' },
            { type: 'scale', name: 'gypsy', title: 'Gypsy Scale', description: 'Romani Mediterranean' }
        ],
        'celtic-scales': [
            { type: 'scale', name: 'dorian', title: 'Dorian Mode', description: 'Traditional Celtic sound' },
            { type: 'chord', name: 'sus4', title: 'Open Celtic chord' },
            { type: 'scale', name: 'mixolydian', title: 'Mixolydian Mode', description: 'Irish traditional music' },
            { type: 'interval', name: 'perfect-4th', title: 'Perfect 4th', description: 'Celtic suspension' },
            { type: 'scale', name: 'pentatonic-major', title: 'Major Pentatonic', description: 'Simple Celtic melody' },
            { type: 'chord', name: 'sus2', title: 'Airy Celtic sound' },
            { type: 'scale', name: 'pentatonic-minor', title: 'Melancholic Celtic' },
            { type: 'interval', name: 'perfect-5th', title: 'Perfect 5th', description: 'Celtic drone interval' },
            { type: 'chord', name: 'major-triad', title: 'Bright Celtic harmony' },
            { type: 'scale', name: 'aeolian', title: 'Aeolian Mode', description: 'Natural minor Celtic' },
            { type: 'chord', name: 'minor-triad', title: 'Sad Celtic ballad' },
            { type: 'interval', name: 'major-2nd', title: 'Step-wise Celtic melody' },
            { type: 'scale', name: 'lydian', title: 'Lydian Mode', description: 'Magical Celtic sound' },
            { type: 'chord', name: 'add9', title: 'Add9', description: 'Modern Celtic color' },
            { type: 'scale', name: 'major', title: 'Major Scale', description: 'Happy Celtic dance' },
            { type: 'interval', name: 'minor-3rd', title: 'Minor 3rd', description: 'Celtic minor third' },
            { type: 'chord', name: '6', title: 'Major 6th', description: 'Sweet Celtic harmony' },
            { type: 'scale', name: 'minor', title: 'Natural Minor', description: 'Tragic Celtic tale' },
            { type: 'chord', name: 'add9', title: 'Add9', description: 'Modern Celtic color' },
            { type: 'interval', name: 'major-6th', title: 'Major 6th', description: 'Celtic major sixth' },
            { type: 'chord', name: 'maj7', title: 'Dreamy Celtic mist' }
        ],
        'eastern-scales': [
            { type: 'scale', name: 'hirajoshi', title: 'Hirajoshi', description: 'Japanese pentatonic scale' },
            { type: 'chord', name: 'sus4', title: 'Open Eastern harmony' },
            { type: 'scale', name: 'japanese-in-sen', title: 'Japanese In Sen', description: 'Traditional Japanese scale' },
            { type: 'interval', name: 'perfect-4th', title: 'Perfect 4th', description: 'Eastern suspension' },
            { type: 'scale', name: 'chinese-pentatonic', title: 'Chinese Pentatonic', description: 'Traditional Chinese scale' },
            { type: 'chord', name: 'sus2', title: 'Open pentatonic sound' },
            { type: 'scale', name: 'mongolian', title: 'Mongolian Scale', description: 'Central Asian pentatonic' },
            { type: 'chord', name: 'add9', title: 'Pentatonic with 9th' },
            { type: 'scale', name: 'blues', title: 'Blues Scale', description: 'Pentatonic with blue note' },
            { type: 'interval', name: 'major-2nd', title: 'Pentatonic 9th interval' },
            { type: 'scale', name: 'pentatonic-blues', title: 'Pentatonic Blues', description: 'Hybrid pentatonic blues' },
            { type: 'chord', name: '6', title: 'Major 6th', description: 'Pentatonic 6th chord' },
            { type: 'scale', name: 'egyptian', title: 'Egyptian Scale', description: 'Ancient pentatonic variant' },
            { type: 'interval', name: 'minor-3rd', title: 'Sadness in pentatonic' },
            { type: 'chord', name: 'm6', title: 'Minor 6th', description: 'Minor pentatonic 6th' },
            { type: 'interval', name: 'perfect-4th', title: 'Pentatonic sus4 interval' }
        ],
        'modern-jazz': [
            { type: 'scale', name: 'altered', title: 'Altered Scale', description: 'Super locrian for altered chords' },
            { type: 'chord', name: '7b5', title: '7♭5', description: 'Altered dominant chord' },
            { type: 'scale', name: 'whole-tone', title: 'Whole Tone', description: 'Impressionistic jazz scale' },
            { type: 'chord', name: 'augmented', title: 'Augmented Triad', description: 'Mysterious jazz chord' },
            { type: 'scale', name: 'diminished', title: 'Diminished Scale', description: 'Symmetrical jazz scale' },
            { type: 'chord', name: 'dim7', title: 'Diminished 7th', description: 'Passing chord in jazz' },
            { type: 'scale', name: 'half-whole-diminished', title: 'Half-Whole Diminished', description: 'For dominant 7♭9' },
            { type: 'chord', name: 'dom7b9', title: 'Dom7♭9', description: 'Dominant with flat 9' },
            { type: 'scale', name: 'whole-half-diminished', title: 'Whole-Half Diminished', description: 'For diminished chords' },
            { type: 'chord', name: 'diminished', title: 'Diminished Triad', description: 'Two minor 3rds' },
            { type: 'interval', name: 'minor-3rd', title: 'Minor 3rd', description: 'Diminished building block' },
            { type: 'chord', name: 'half-dim7', title: 'Half Diminished 7th', description: 'Minor 7♭5' },
            { type: 'scale', name: 'locrian', title: 'Locrian Mode', description: 'Natural diminished mode' },
            { type: 'chord', name: 'min7b5', title: 'Minor 7th ♭5', description: 'Same as half diminished' },
            { type: 'interval', name: 'tritone', title: 'Tritone', description: 'Diminished 5th' },
            { type: 'chord', name: 'dom7#9', title: 'Dom7#9', description: 'Hendrix chord' },
            { type: 'scale', name: 'super-locrian', title: 'Super Locrian', description: 'Altered scale' },
            { type: 'chord', name: 'alt7', title: 'Altered 7th', description: 'All alterations' },
            { type: 'interval', name: 'augmented-4th', title: 'Augmented 4th', description: 'Same as tritone' },
            { type: 'chord', name: 'dom7b5', title: 'Dom7♭5', description: 'Dominant flat 5' },
            { type: 'scale', name: 'octatonic', title: 'Octatonic Scale', description: 'Eight-note diminished' },
            { type: 'chord', name: 'dim-maj7', title: 'Diminished Major 7th', description: 'Rare diminished chord' },
            { type: 'interval', name: 'diminished-5th', title: 'Flat 5 interval' },
            { type: 'chord', name: 'fully-diminished', title: 'Fully Diminished 7th', description: 'All minor 3rds' }
        ],
        'whole-tone-world': [
            { type: 'scale', name: 'whole-tone', title: 'Whole Tone Scale', description: 'Only whole steps' },
            { type: 'chord', name: 'augmented', title: 'Augmented Triad', description: 'Whole tone harmony' },
            { type: 'interval', name: 'major-3rd', title: 'Major 3rd', description: 'Two whole steps' },
            { type: 'chord', name: 'suspended-aug', title: 'Suspended Augmented', description: 'Sus with aug 5th' }
        ],
        'jazz-standards-starter': [
            { key: 'D', type: 'chord', name: 'min7', title: 'Dm7 (ii)', description: 'The ii chord. Use D Dorian.' },
            { key: 'D', type: 'scale', name: 'dorian', title: 'D Dorian', description: 'The scale for the Dm7 chord.' },
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7 (V)', description: 'The V chord. Use G Mixolydian or G Altered.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'G Mixolydian', description: 'The basic scale for the G7 chord.' },
            { key: 'C', type: 'chord', name: 'maj7', title: 'Cmaj7 (I)', description: 'The I chord. Use C Ionian (Major).' },
            { key: 'C', type: 'scale', name: 'major', title: 'C Major', description: 'The scale for the Cmaj7 chord.' },
            { key: 'A', type: 'chord', name: 'min7', title: 'Am7 (vi)', description: 'The vi chord. Use A Aeolian.' },
            { key: 'A', type: 'scale', name: 'aeolian', title: 'A Aeolian', description: 'The natural minor scale.' }
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
            { key: 'A', type: 'chord', name: 'min7', title: 'Am7 (Aeolian)', description: 'The Aeolian chord. Natural minor, sad or serious.' },
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
            { key: 'G', type: 'chord', name: 'dom7', title: 'G7', description: 'The V chord. Classic Mixolydian.' }
        ],
        'country-twang': [
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'The I chord. A Major Pentatonic is your best friend.' },
            { key: 'A', type: 'scale', name: 'pentatonic-major', title: 'A Major Pentatonic', description: 'Perfect for classic country licks.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The IV chord. You can stick with A Major Pentatonic or switch.' },
            { key: 'A', type: 'scale', name: 'blues', title: 'A Blues Scale', description: 'Add the b3 for a bluesy country feel.' },
            { key: 'E', type: 'chord', name: 'dom7', title: 'E7', description: 'The V chord. Target the chord tones.' },
            { key: 'E', type: 'scale', name: 'mixolydian', title: 'E Mixolydian', description: 'The perfect scale to outline the V7 sound.' }
        ],
        'cinematic-soundscapes': [
            { key: 'C', type: 'chord', name: 'minor-triad', title: 'C Minor', description: 'A dramatic opening. Use C Aeolian.' },
            { key: 'C', type: 'scale', name: 'aeolian', title: 'C Aeolian', description: 'The natural minor for a somber mood.' },
            { key: 'A', type: 'chord', name: 'augmented', title: 'Ab Augmented', description: 'A mysterious, floating sound.' },
            { key: 'A', type: 'scale', name: 'whole-tone', title: 'Ab Whole Tone', description: 'A dreamy, unresolved scale.' },
            { key: 'F', type: 'chord', name: 'maj7', title: 'Fmaj7#11', description: 'A wide, open, magical chord.' },
            { key: 'F', type: 'scale', name: 'lydian', title: 'F Lydian', description: 'The quintessential scale for wonder and awe.' }
        ],
        'gospel-harmonies': [
            { key: 'C', type: 'chord', name: 'maj9', title: 'Cmaj9 (I)', description: 'A rich tonic chord.' },
            { key: 'C', type: 'scale', name: 'major', title: 'C Major', description: 'Use the major scale with added color tones.' },
            { key: 'F', type: 'chord', name: 'maj9', title: 'Fmaj9 (IV)', description: 'A beautiful, lush subdominant.' },
            { key: 'F', type: 'scale', name: 'lydian', title: 'F Lydian', description: 'Adds the #4/11 for a classic gospel sound.' },
            { key: 'G', type: 'chord', name: '13', title: 'G13 (V)', description: 'The dominant chord with all the extensions.' },
            { key: 'G', type: 'scale', name: 'mixolydian', title: 'G Mixolydian', description: 'The foundation for dominant chords.' }
        ],
        'reggae-rhythms': [
            { key: 'A', type: 'chord', name: 'major-triad', title: 'A Major', description: 'The I chord, played on the upbeats.' },
            { key: 'A', type: 'scale', name: 'major', title: 'A Major', description: 'Simple, happy melodies.' },
            { key: 'D', type: 'chord', name: 'major-triad', title: 'D Major', description: 'The IV chord. Keep it bright.' },
            { key: 'A', type: 'scale', name: 'pentatonic-major', title: 'A Major Pentatonic', description: 'Great for fills and solos.' },
            { key: 'E', type: 'chord', name: 'major-triad', title: 'E Major', description: 'The V chord, strong and sunny.' },
            { key: 'E', type: 'scale', name: 'mixolydian', title: 'E Mixolydian', description: 'The b7 adds a relaxed, groovy feel.' }
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
    const slideshowSelect = document.getElementById('slideshow-select');
    const slideshowMeasures = document.getElementById('slideshow-measures');
    const slideshowBpm = document.getElementById('slideshow-bpm');
    
    const slideshowProgressFill = document.getElementById('slideshow-progress-fill');
    const slideshowCounter = document.getElementById('slideshow-counter');
    const currentItemName = document.getElementById('current-item-name');
    const currentItemDescription = document.getElementById('current-item-description');
    const slideshowTranspose = document.getElementById('slideshow-transpose');

    // Add collapsible functionality for slideshow
    const slideshowHeader = document.getElementById('slideshow-header');
    const slideshowContent = document.getElementById('slideshow-content');
    const slideshowCollapseIcon = slideshowHeader.querySelector('.collapse-icon');

    slideshowHeader.addEventListener('click', () => {
        slideshowContent.classList.toggle('collapsed');
        slideshowCollapseIcon.classList.toggle('rotated');
    });

    function getSlideDurationMs() {
        // This function is now less relevant as duration is handled by the beat timer.
        // It's kept for potential future use or alternative timing models.
        const currentSlide = currentSlideshow ? currentSlideshow[currentSlideIndex] : null;
        const measures = (currentSlide && currentSlide.measures) ? parseInt(currentSlide.measures, 10) : (parseInt(slideshowMeasures.value, 10) || 2);
        const bpm = parseInt(slideshowBpm.value, 10) || 120;
        const beatsPerMeasure = 4; // Assuming 4/4 time signature
        const duration = (measures * beatsPerMeasure * 60 * 1000) / bpm;
        return duration;
    }

    function updateSlideshowSpeedDisplay() {
        const speed = parseFloat(slideshowBpm.value);
        slideshowBpm.textContent = `${speed}s`;
    }

    function playSlideshow() {
        if (!slideshowSelect.value) return;

        const transposeValue = parseInt(slideshowTranspose.value, 10);
        const originalSlideshow = SLIDESHOWS[slideshowSelect.value];
        
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
        slideshowPlayHidden.disabled = true;
        slideshowPause.disabled = false;
        slideshowStop.disabled = false;
        slideshowStopHidden.disabled = false;
        
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
                : (parseInt(slideshowMeasures.value, 10) || 2);

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
            : (parseInt(slideshowMeasures.value, 10) || 2);

        const beatsPerMeasure = 4;
        
        const measure = Math.floor((currentBeat - 1) / beatsPerMeasure) + 1;
        const beatInMeasure = ((currentBeat - 1) % beatsPerMeasure) + 1;
        
        slideshowTimeRemaining.textContent = `Measure: ${measure}/${measuresPerSlide} | Beat: ${beatInMeasure}`;
    }


    function pauseSlideshow() {
        isPlaying = false;
        slideshowPlay.disabled = false;
        slideshowPlayHidden.disabled = false;
        slideshowPause.disabled = true;
        
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
            slideshowTimer = null;
        }
    }

    function stopSlideshow() {
        pauseSlideshow(); // Clears timers
        
        isPlaying = false;
        slideshowPlay.disabled = false;
        slideshowPlayHidden.disabled = false;
        slideshowPause.disabled = true;
        slideshowStop.disabled = true;
        slideshowStopHidden.disabled = true;
        
        currentSlideIndex = 0;
        currentBeat = 0;
        currentSlideshow = null;
        
        // Reset display
        slideshowProgressFill.style.width = '0%';
        slideshowCounter.textContent = '0 / 0';
        currentItemName.textContent = 'Ready to start slideshow';
        currentItemDescription.textContent = 'Select a theme and press play';
        slideshowTimeRemaining.textContent = ''; // Clear countdown display
        
        // Clear all visible notes
        const notes = fretboard.querySelectorAll('.note');
        notes.forEach(note => note.classList.remove('visible'));
        
        // Update selection display
        updateCurrentSelectionDisplay();
    }

    function previousSlide() {
        if (!currentSlideshow) return;
        
        currentSlideIndex = (currentSlideIndex - 1 + currentSlideshow.length) % currentSlideshow.length;
        currentBeat = 1;
        showCurrentSlide();
        if (isPlaying) {
            startBeatTimer(); // Restart timer to sync with new slide
        }
    }

    function nextSlide() {
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
        
        // Update display
        const progress = ((currentSlideIndex + 1) / currentSlideshow.length) * 100;
        slideshowProgressFill.style.width = `${progress}%`;
        slideshowCounter.textContent = `${currentSlideIndex + 1} / ${currentSlideshow.length}`;
        currentItemName.textContent = `${selectedKey} ${slide.title}`;
        currentItemDescription.textContent = slide.description;
        
        // Update fretboard
        updateNoteClasses();
        
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

    function startSlideshowTimer() {
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
        }
        
        const speed = getSlideDurationMs();
        slideshowTimer = setInterval(() => {
            if (isPlaying) {
                nextSlide();
            }
        }, speed);
    }

    function startCountdownDisplay() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        slideshowTimeRemaining.textContent = `${(slideDurationMs / 1000).toFixed(0)}s`;
        
        countdownInterval = setInterval(() => {
            const elapsedTime = performance.now() - currentSlideStartTime;
            const remaining = Math.max(0, (slideDurationMs - elapsedTime) / 1000);
            slideshowTimeRemaining.textContent = `${Math.ceil(remaining)}s`;
            
            // If remaining time is zero or less, clear the countdown interval
            // and ensure the display shows "0s". The main slideshowTimer
            // will handle advancing the slide.
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null; // Clear the reference
                slideshowTimeRemaining.textContent = '0s'; 
            }
        }, 100); // Update every 100ms for smoother countdown
    }

    // Event listeners for slideshow controls
    slideshowPlay.addEventListener('click', playSlideshow);
    slideshowPlayHidden.addEventListener('click', playSlideshow);
    slideshowPause.addEventListener('click', pauseSlideshow);
    slideshowStop.addEventListener('click', stopSlideshow);
    slideshowStopHidden.addEventListener('click', stopSlideshow);
    slideshowPrev.addEventListener('click', previousSlide);
    slideshowNext.addEventListener('click', nextSlide);

    slideshowSelect.addEventListener('change', () => {
        slideshowSelectHiddenMain.value = slideshowSelect.value;
        const hiddenSelect = document.getElementById('slideshow-select-hidden');
        if (hiddenSelect) hiddenSelect.value = slideshowSelect.value;
        if (isPlaying) {
            stopSlideshow();
        }
    });

    // Sync other selects back to the main one
    slideshowSelectHiddenMain.addEventListener('change', () => {
        slideshowSelect.value = slideshowSelectHiddenMain.value;
        slideshowSelect.dispatchEvent(new Event('change'));
    });
    const hiddenSlideshowSelect = document.getElementById('slideshow-select-hidden');
    if (hiddenSlideshowSelect) {
        hiddenSlideshowSelect.addEventListener('change', () => {
             slideshowSelect.value = hiddenSlideshowSelect.value;
             slideshowSelect.dispatchEvent(new Event('change'));
        });
    }

    // Stop slideshow if timing or transpose value is changed
    [slideshowMeasures, slideshowBpm, slideshowTranspose].forEach(input => {
        input.addEventListener('change', () => {
            if (isPlaying) {
                stopSlideshow();
                alert("Slideshow stopped due to settings change. Press Play to restart.");
            }
        });
    });

    // Initialize slideshow controls
    slideshowPause.disabled = true;
    slideshowStop.disabled = true;
    slideshowStopHidden.disabled = true;
    slideshowTimeRemaining.textContent = ''; // Initially empty

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
        location.reload();
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
            questionText = `This note is the "${targetIntervalName}" of ${selectedKey}. What note is it?`;
            questionNoteElement.textContent = targetIntervalName; // Show interval on the note
            correctAnswer = targetNoteName;
            options = generateOptions(correctAnswer, CHROMATIC_SCALE);
        } else { // 'interval'
            questionText = `This note is "${targetNoteName}". What is its interval in the ${selectedKey} ${selectedScaleName.replace(/-/g, ' ')} scale?`;
            questionNoteElement.textContent = targetNoteName; // Show note name on the note
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

    function getScaleNotes(key, scaleName) {
        if (!SCALES[scaleName]) return [];
        const keyIndex = CHROMATIC_SCALE.indexOf(key);
        const scaleIntervals = SCALES[scaleName];
        return scaleIntervals.map(interval => {
            const noteIndex = (keyIndex + interval) % 12;
            return CHROMATIC_SCALE[noteIndex];
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
            
            if (selectedScale === 'chromatic') {
                // All notes are "in scale" for chromatic
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

    for (let i = 1; i <= NUM_FRETS; i++) {
        const fret = document.createElement('div');
        fret.className = 'fret';
        fret.style.left = `calc(${NUT_WIDTH_PX + (i / NUM_FRETS) * effectiveFretboardWidth - 5}px)`;
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
            
            default: // 'note-names'
                return noteName;
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
    for (let i = 0; i < TUNING.length; i++) {
        const string = document.createElement('div');
        string.className = 'string';
        const stringThickness = 1.5 + i * 0.5;
        string.style.height = `${stringThickness}px`;
        string.style.top = `calc(${((i + 0.5) / TUNING.length) * 100}% - ${stringThickness / 2}px)`;
        fretboard.appendChild(string);
    }
    
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
            
            if (selectedScale === 'chromatic') {
                // All notes are "in scale" for chromatic
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

    keySelect.addEventListener('change', () => {
        if (isQuizActive) {
            generateNewQuestion();
        } else {
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

    function updateStringWidths() {
        const baseWidth = parseFloat(stringWidthSlider.value);
        document.documentElement.style.setProperty('--string-base-width', `${baseWidth}px`);
        stringWidthValue.textContent = `${baseWidth}px`;
        
        // Update individual string thicknesses
        const strings = fretboard.querySelectorAll('.string');
        strings.forEach((string, i) => {
            const stringThickness = baseWidth + i * (baseWidth * 0.3);
            string.style.height = `${stringThickness}px`;
            string.style.top = `calc(${((i + 0.5) / TUNING.length) * 100}% - ${stringThickness / 2}px)`;
        });
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

    function displayFretNumbers() {
        fretNumbersDisplay.innerHTML = ''; 
        const fretboardWidth = fretboard.offsetWidth; 
        const effectiveFretboardWidth = fretboardWidth - NUT_WIDTH_PX;

        for (let i = 1; i <= NUM_FRETS; i++) {
            const fretNumberLabel = document.createElement('div');
            fretNumberLabel.className = 'fret-number-label';
            fretNumberLabel.textContent = i;

            // Calculate position to center under the fret *space*
            const leftPos = NUT_WIDTH_PX + ((i - 0.5) * (effectiveFretboardWidth / NUM_FRETS));
            fretNumberLabel.style.left = `${leftPos}px`;

            fretNumbersDisplay.appendChild(fretNumberLabel);
        }
    }

    // Add event listeners for new controls
    stringWidthSlider.addEventListener('input', updateStringWidths);
    fretWidthSlider.addEventListener('input', updateFretWidth);
    noteSizeSlider.addEventListener('input', updateNoteSize);
    noteColorPreset.addEventListener('change', updateNoteColorPreset);
    inlayColorInput.addEventListener('input', updateInlayColor); 
    noteDisplayType.addEventListener('change', () => {
        updateNoteDisplay();
    });
    fretColorInput.addEventListener('input', updateFretColor);
    stringColorInput.addEventListener('input', updateStringColor);
    noteFontColorInput.addEventListener('input', updateNoteFontColor); 
    noteFontSelect.addEventListener('change', updateNoteFont);
    pageThemeSelect.addEventListener('change', (e) => {
        document.body.className = ''; 
        if (e.target.value !== 'dark-mode') {
            document.body.classList.add(e.target.value);
        }
        // re-apply note color preset class
        updateNoteColorPreset();
        updateInlayColor(); 
    });
    noteShapeSelect.addEventListener('change', rebuildFretboard); 

    // Initialize new controls
    updateStringWidths();
    updateFretWidth();
    updateNoteSize();
    updateNoteColorPreset();
    updateInlayColor(); 
    updateFretColor();
    updateStringColor();
    updateNoteFontColor(); 
    updateNoteFont();

    // Initialize scale highlighting
    updateNoteClasses();
    
    // Function to update the current selection display text
    function updateCurrentSelectionDisplay() {
        let displayString = "";
        let intervalString = "";
        let noteString = "";
        const selectedKey = keySelect.value;
        const selectedOption = scaleSelect.options[scaleSelect.selectedIndex];
        const selectedOptionText = selectedOption.textContent;
        
        let currentKeyForNotes;
        let currentScaleNameForNotes;

        if (isPlaying && currentSlideshow && currentSlideshow[currentSlideIndex]) {
            const slide = currentSlideshow[currentSlideIndex];
            const displayKey = slide.key || selectedKey;
            displayString = `${displayKey} ${slide.title}`;
            currentKeyForNotes = displayKey;
            currentScaleNameForNotes = slide.name;
        } else {
            const selectedScaleName = scaleSelect.value;
            if (selectedScaleName === "") {
                displayString = selectedOptionText;
            } else {
                displayString = `${selectedKey} ${selectedOptionText}`;
                if (selectedOption.closest('optgroup')?.label === 'Scales' && selectedScaleName !== 'chromatic') {
                    displayString += ' Scale';
                }
            }
            currentKeyForNotes = selectedKey;
            currentScaleNameForNotes = selectedScaleName;
        }
        
        intervalString = getIntervalString(currentScaleNameForNotes);
        noteString = getNoteString(currentKeyForNotes, currentScaleNameForNotes);
        
        currentSelectionDisplay.textContent = displayString;
        currentSelectionIntervals.textContent = intervalString;
        currentSelectionNotes.textContent = noteString;
    }

    // Function to get interval names for a scale
    function getIntervalString(scaleName) {
        if (!SCALES[scaleName] || scaleName === 'chromatic') return '';
        
        const intervalNames = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
        const scaleIntervals = SCALES[scaleName];

        if (scaleIntervals.length === 1 && scaleIntervals[0] === 0) {
            return '(R)';
        }

        return `(${scaleIntervals.map(i => intervalNames[i]).join('-')})`;
    }

    // Function to get note names for a scale
    function getNoteString(key, scaleName) {
        if (!SCALES[scaleName] || scaleName === 'chromatic') return '';
        const scaleNotes = getScaleNotes(key, scaleName);
        if (scaleNotes.length === 1 && SCALES[scaleName][0] === 0) {
            return `(${scaleNotes[0]})`;
        }
        return `(${scaleNotes.join('-')})`;
    }

    // Initial note creation and display update
    updateCurrentSelectionDisplay();

    // --- Modal Logic --- (Functionality removed, but listeners kept to avoid errors if HTML is not fully cleaned up)
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            if (modalFretboardContent) {
                 // Clear previous content
                modalFretboardContent.innerHTML = '';
                
                // Clone the fretboard and its fret numbers display
                const fretboardClone = fretboard.cloneNode(true);
                const fretNumbersClone = fretNumbersDisplay.cloneNode(true);
                
                // Append clones to the modal
                modalFretboardContent.appendChild(fretboardClone);
                modalFretboardContent.appendChild(fretNumbersClone);
            }
            if(modal) modal.style.display = 'flex';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if(modal) modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            if(modal) modal.style.display = 'none';
        }
    });

    // --- CSV Import/Export Logic ---
    const CSV_HEADERS = ['key', 'type', 'name', 'description', 'measures'];

    const IMPORTED_SLIDESHOW_CSV_CONTENT = `key,type,name,description
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
F#,scale,minor-pentatonic,F# Minor Pentatonic Scale
G,scale,minor-pentatonic-add-2,G Minor Pentatonic Add 2 Scale
A,scale,augmented-pentatonic,A Augmented Pentatonic Scale
B,scale,diminished-pentatonic,B Diminished Pentatonic Scale
C,scale,whole-tone-pentatonic,C Whole Tone Pentatonic Scale
D,scale,lydian-pentatonic,D Lydian Pentatonic Scale
E,scale,mixolydian-pentatonic,E Mixolydian Pentatonic Scale
F#,scale,phrygian-pentatonic,F# Phrygian Pentatonic Scale
G,scale,locrian-pentatonic,G Locrian Pentatonic Scale
A,scale,harmonic-minor-pentatonic,A Harmonic Minor Pentatonic Scale
B,scale,melodic-minor-pentatonic,B Melodic Minor Pentatonic Scale
C,scale,bebop-dominant-alt,C Bebop Dominant Alt Scale
D,scale,bebop-major-alt,D Bebop Major Alt Scale
E,scale,bebop-minor-alt,E Bebop Minor Alt Scale
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
F#,scale,ionian-flat-5,F# Ionian Flat 5 Scale
G,scale,aeolian-sharp-7,G Aeolian Sharp 7 Scale
A,scale,dorian-flat-4,A Dorian Flat 4 Scale
B,scale,lydian-flat-2,B Lydian Flat 2 Scale
C,scale,mixolydian-sharp-5,C Mixolydian Sharp 5 Scale
D,scale,locrian-sharp-4,D Locrian Sharp 4 Scale
E,scale,major-minor-scale,E Major Minor Scale
F#,scale,persian-augmented,F# Persian Augmented Scale
G,scale,romanian-major,G Romanian Major Scale
A,scale,ukrainian-major,A Ukrainian Major Scale
B,scale,hungarian-major-alt,B Hungarian Major Alt Scale
C#,scale,enigmatic-harmonic,C# Enigmatic Harmonic Scale
D#,scale,whole-tone-major,D# Whole Tone Major Scale
F,scale,diminished-major,F Diminished Major Scale
G#,scale,chromatic-minor,G# Chromatic Minor Scale
A#,scale,pentatonic-hybrid,A# Pentatonic Hybrid Scale
B,scale,diminished-whole-tone,B Diminished Whole Tone Scale
C,scale,half-diminished-scale,C Half Diminished Scale
D,scale,jazz-diminished,D Jazz Diminished Scale
E,scale,major-b2,E Major Flat 2 Scale
F#,scale,lydian-b3,F# Lydian Flat 3 Scale
G,scale,mixolydian-b5,G Mixolydian Flat 5 Scale
A,scale,phrygian-b4,A Phrygian Flat 4 Scale
B,scale,major-b6,B Major Flat 6 Scale
C#,scale,minor-b2,C# Minor Flat 2 Scale
D#,scale,major-b7,D# Major Flat 7 Scale
F,scale,minor-b5,F Minor Flat 5 Scale
G#,scale,major-b3,G# Major Flat 3 Scale
A#,scale,minor-b4,A# Minor Flat 4 Scale
B,scale,major-b9,B Major Flat 9 Scale
C,scale,minor-b9,C Minor Flat 9 Scale
D,scale,major-b13,D Major Flat 13 Scale
E,scale,minor-b13,E Minor Flat 13 Scale
F#,scale,major-sharp-4-sharp-5,F# Major Sharp 4 Sharp 5 Scale
G,scale,minor-sharp-4,G Minor Sharp 4 Scale
A,scale,dominant-sharp-9,A Dominant Sharp 9 Scale
B,scale,dominant-flat-9-flat-5,B Dominant Flat 9 Flat 5 Scale
C,scale,lydian-major,C Lydian Major Scale
D,scale,mixolydian-minor,D Mixolydian Minor Scale
E,scale,phrygian-major,E Phrygian Major Scale
F#,scale,locrian-minor,F# Locrian Minor Scale
G,scale,gypsy-harmonic,G Gypsy Harmonic Scale
A,scale,hungarian-major-minor,A Hungarian Major Minor Scale
B,scale,romanian-major-minor,B Romanian Major Minor Scale
C#,scale,ukrainian-major-minor,C# Ukrainian Major Minor Scale
D#,scale,flamenco-dominant,D# Flamenco Dominant Scale
F,scale,andalusian-minor,F Andalusian Minor Scale
G#,scale,maqam-hijaz-kar,G# Maqam Hijaz Kar Scale
A#,scale,maqam-kurd-major,A# Maqam Kurd Major Scale
B,scale,overtone-augmented,B Overtone Augmented Scale
C,scale,scriabin-augmented,C Scriabin Augmented Scale
D,scale,petrushka-whole-tone,D Petrushka Whole Tone Scale
E,scale,octatonic,E Octatonic Scale
F#,scale,balinese-pelog,F# Balinese Pelog Scale
G,scale,egyptian,G Egyptian Scale
A,scale,ethiopian,A Ethiopian Scale
B,scale,jewish-major,B Jewish Major Scale
C#,scale,klezmer-major,C# Klezmer Major Scale
D#,scale,todi-raga-major,D# Todi Raga Major Scale
F,scale,marva-raga-major,F Marva Raga Major Scale
G#,scale,purvi-raga-major,G# Purvi Raga Major Scale
A#,scale,augmented-whole-tone,A# Augmented Whole Tone Scale
B,scale,bebop-augmented,B Bebop Augmented Scale
C,scale,chromatic-octatonic,C Chromatic Octatonic Scale
D,scale,double-diminished,D Double Diminished Scale
E,scale,lydian-flat-5,E Lydian Flat 5 Scale
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
});