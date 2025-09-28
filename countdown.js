/**
 * Countdown Flip Timer
 * Pure JavaScript countdown timer with flip clock animation
 * No external dependencies required
 * 
 * @version 1.0.0
 * @license MIT
 */

class CountdownFlipTimer {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            throw new Error('CountdownFlipTimer: Element not found');
        }

        // Configuration par défaut
        this.defaultOptions = {
            timeText: this.getDefaultTargetTime(),
            timeZone: 0,
            style: 'Flip',
            color: 'black',
            width: 0,
            textGroupSpace: 15,
            textSpace: 0,
            reflection: true,
            reflectionOpacity: 10,
            reflectionBlur: 0,
            dayTextNumber: 2,
            displayDay: true,
            displayHour: true,
            displayMinute: true,
            displaySecond: true,
            displayLabel: true,
            onFinish: null
        };

        this.options = { ...this.defaultOptions, ...options };
        this.interval = null;
        this.isRunning = false;
        this.targetTime = null;
        
        this.init();
    }

    /**
     * Obtient la date cible par défaut (24h à partir de maintenant)
     * Format: Année/Mois/Date Heure:Minute:Seconde
     */
    getDefaultTargetTime() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.getFullYear() + '/' + 
               String(tomorrow.getMonth() + 1).padStart(2, '0') + '/' + 
               String(tomorrow.getDate()).padStart(2, '0') + ' ' +
               String(tomorrow.getHours()).padStart(2, '0') + ':' +
               String(tomorrow.getMinutes()).padStart(2, '0') + ':' +
               String(tomorrow.getSeconds()).padStart(2, '0');
    }

    /**
     * Initialise le timer
     */
    init() {
        this.parseTargetTime();
        this.createHTML();
    }

    /**
     * Parse la chaîne de temps cible
     */
    parseTargetTime() {
        try {
            const timeStr = this.options.timeText;
            const targetDate = new Date(timeStr);
            
            // Applique le décalage de fuseau horaire
            const offsetMs = this.options.timeZone * 60 * 60 * 1000;
            this.targetTime = targetDate.getTime() + offsetMs;
            
            if (isNaN(this.targetTime)) {
                throw new Error('Format de date invalide');
            }
        } catch (error) {
            console.error('CountdownFlipTimer: Format timeText invalide. Utilisez YYYY/MM/DD HH:MM:SS');
            this.targetTime = Date.now() + 24 * 60 * 60 * 1000;
        }
    }

    /**
     * Crée la structure HTML
     */
    createHTML() {
        this.element.className = `countdown-flip-timer ${this.options.style.toLowerCase()} ${this.options.color}`;
        
        if (this.options.reflection) {
            this.element.classList.add('with-reflection');
        }

        let html = '<div class="countdown-container">';
        
        const units = [
            { key: 'day', display: this.options.displayDay, label: 'DAYS' },
            { key: 'hour', display: this.options.displayHour, label: 'HOURS' },
            { key: 'minute', display: this.options.displayMinute, label: 'MINUTES' },
            { key: 'second', display: this.options.displaySecond, label: 'SECONDS' }
        ];

        units.forEach((unit, index) => {
            if (unit.display) {
                const digits = unit.key === 'day' ? this.options.dayTextNumber : 2;
                html += this.createUnitHTML(unit.key, unit.label, digits, index > 0);
            }
        });

        html += '</div>';
        this.element.innerHTML = html;

        // Apply custom styles
        this.applyCustomStyles();
    }

    /**
     * Crée le HTML pour une unité de temps
     */
    createUnitHTML(unit, label, digits, addSpace) {
        const spaceStyle = addSpace ? `margin-left: ${this.options.textGroupSpace}px;` : '';
        let html = `<div class="time-unit ${unit}" style="${spaceStyle}">`;
        
        // Create digit containers
        for (let i = 0; i < digits; i++) {
            const digitSpaceStyle = i > 0 ? `margin-left: ${this.options.textSpace}px;` : '';
            html += `<div class="digit-container" style="${digitSpaceStyle}">
                        <div class="digit-card">
                            <div class="digit-top">
                                <span class="digit-value">0</span>
                            </div>
                            <div class="digit-bottom">
                                <span class="digit-value">0</span>
                            </div>
                            <div class="digit-flip">
                                <div class="digit-flip-top">
                                    <span class="digit-value">0</span>
                                </div>
                                <div class="digit-flip-bottom">
                                    <span class="digit-value">0</span>
                                </div>
                            </div>
                        </div>
                        ${this.options.reflection ? '<div class="digit-reflection"></div>' : ''}
                     </div>`;
        }

        if (this.options.displayLabel) {
            html += `<div class="time-label">${label}</div>`;
        }

        html += '</div>';
        return html;
    }

    /**
     * Applique les styles personnalisés
     */
    applyCustomStyles() {
        const style = document.createElement('style');
        let css = '';

        if (this.options.width > 0) {
            css += `.countdown-flip-timer .digit-card { width: ${this.options.width}px; }`;
        }

        if (this.options.reflection) {
            css += `
                .countdown-flip-timer .digit-reflection {
                    opacity: ${this.options.reflectionOpacity / 100};
                    filter: blur(${this.options.reflectionBlur}px);
                }
            `;
        }

        if (css) {
            style.textContent = css;
            document.head.appendChild(style);
        }
    }


    /**
     * démarrer – démarrer le compte à rebours
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.update(); // Initial update
        this.interval = setInterval(() => this.update(), 1000);
    }

    /**
     * stop – arrêter le compte à rebours
     */
    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * Met à jour l'affichage du countdown
     */
    update() {
        const now = Date.now();
        const remaining = this.targetTime - now;

        if (remaining <= 0) {
            this.handleFinish();
            return;
        }

        const time = this.calculateTime(remaining);
        this.updateDisplay(time);
    }

    /**
     * Calcule les composants de temps
     */
    calculateTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days: days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60
        };
    }

    /**
     * Met à jour l'affichage visuel
     */
    updateDisplay(time) {
        const units = ['day', 'hour', 'minute', 'second'];
        const values = [time.days, time.hours, time.minutes, time.seconds];

        units.forEach((unit, index) => {
            if (this.options[`display${unit.charAt(0).toUpperCase() + unit.slice(1)}`]) {
                const digits = unit === 'day' ? this.options.dayTextNumber : 2;
                const value = values[index];
                const paddedValue = String(value).padStart(digits, '0');
                
                this.updateUnitDisplay(unit, paddedValue);
            }
        });
    }

    /**
     * Met à jour l'affichage pour une unité de temps spécifique
     */
    updateUnitDisplay(unit, value) {
        const unitElement = this.element.querySelector(`.time-unit.${unit}`);
        if (!unitElement) return;

        const digitContainers = unitElement.querySelectorAll('.digit-container');
        
        for (let i = 0; i < digitContainers.length; i++) {
            const digit = value[i] || '0';
            this.updateDigit(digitContainers[i], digit);
        }
    }

    /**
     * Met à jour un chiffre avec animation flip
     */
    updateDigit(container, newDigit) {
        const card = container.querySelector('.digit-card');
        const currentDigit = card.querySelector('.digit-top .digit-value').textContent;
        
        if (currentDigit === newDigit) return;

        // Update all digit values
        const digitValues = card.querySelectorAll('.digit-value');
        digitValues.forEach(span => span.textContent = newDigit);

        // Trigger flip animation
        card.classList.add('flipping');
        
        setTimeout(() => {
            card.classList.remove('flipping');
        }, 600);

        // Update reflection if enabled
        if (this.options.reflection) {
            const reflection = container.querySelector('.digit-reflection');
            if (reflection) {
                reflection.textContent = newDigit;
            }
        }
    }

    /**
     * Gère la fin du countdown
     */
    handleFinish() {
        this.stop();
        
        // Set all digits to 0
        const time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        this.updateDisplay(time);

        // Call finish callback
        if (typeof this.options.onFinish === 'function') {
            this.options.onFinish();
        }
    }

    /**
     * créer – créer un compte à rebours
     */
    create() {
        this.init();
        return this;
    }

    /**
     * détruire – compte à rebours de destruction
     */
    destroy() {
        this.stop();
        this.element.innerHTML = '';
        this.element.className = '';
    }

    /**
     * Met à jour les options dynamiquement
     */
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.destroy();
        this.create();
        if (this.isRunning) {
            this.start();
        }
    }
}

// Global factory function for easy usage
window.CountdownFlipTimer = CountdownFlipTimer;

// AMD/CommonJS support
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountdownFlipTimer;
}
