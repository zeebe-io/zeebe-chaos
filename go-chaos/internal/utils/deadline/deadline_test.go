package deadline

import (
	"testing"
	"time"
)

func TestIterateWithSleepSleepsBetweenIterations(t *testing.T) {
	interval := 20 * time.Millisecond
	d := NewDeadliner(time.Hour, interval)

	var starts []time.Time
	for range d.IterateWithSleep() {
		starts = append(starts, time.Now())
		if len(starts) == 3 {
			break
		}
	}

	if len(starts) != 3 {
		t.Fatalf("expected 3 iterations, got %d", len(starts))
	}
	for i := 1; i < len(starts); i++ {
		if gap := starts[i].Sub(starts[i-1]); gap < interval {
			t.Errorf("gap before iteration %d was %s, expected at least %s", i, gap, interval)
		}
	}
}

func TestIterateWithSleepSleepsOnContinue(t *testing.T) {
	interval := 20 * time.Millisecond
	d := NewDeadliner(time.Hour, interval)

	begin := time.Now()
	count := 0
	for range d.IterateWithSleep() {
		count++
		if count == 3 {
			break
		}
		continue
	}

	if elapsed := time.Since(begin); elapsed < 2*interval {
		t.Errorf("expected at least %s elapsed, got %s", 2*interval, elapsed)
	}
}

func TestIterateWithSleepRunsOnceWhenIntervalExceedsTimeout(t *testing.T) {
	d := NewDeadliner(time.Millisecond, time.Hour)

	begin := time.Now()
	count := 0
	for range d.IterateWithSleep() {
		count++
	}

	if count != 1 {
		t.Errorf("expected 1 iteration, got %d", count)
	}
	if elapsed := time.Since(begin); elapsed > time.Second {
		t.Errorf("expected no sleep after the last iteration, took %s", elapsed)
	}
}

func TestIterateWithSleepStopsAtDeadline(t *testing.T) {
	d := NewDeadliner(100*time.Millisecond, 30*time.Millisecond)

	count := 0
	for range d.IterateWithSleep() {
		count++
	}

	if count < 2 || count > 4 {
		t.Errorf("expected between 2 and 4 iterations, got %d", count)
	}
}
